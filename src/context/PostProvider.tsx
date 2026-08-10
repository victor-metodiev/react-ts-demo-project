import { useEffect, useState, type ReactNode } from "react";
import {
  PostContext,
  type Post,
  type PostNonGeneratedProps,
} from "./postContext";
import { BASE_URL } from "../constants";
import { useAuth } from "./authContext";
import { postsArraySchema, postSchema } from "../schemas/post.schema";

type PostProviderProps = {
  children: ReactNode;
};

export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    let isMounted = true;

    fetch(`${BASE_URL}/posts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("An error occured while trying to fetch posts.");
        }

        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          const validatedPosts = postsArraySchema.parse(data);
          setPosts(validatedPosts);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const findPostById = (id: string) => {
    return posts.find((post) => post.id === id);
  };

  const addPost = async ({ title, description }: PostNonGeneratedProps) => {
    if (!user || !token) {
      throw new Error("You must be logged in to create a post.");
    }

    const newPostPayload = {
      id: crypto.randomUUID(),
      title,
      description,
      userId: user.id,
      authorName: `${user.firstName} ${user.lastName}`,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPostPayload),
      });

      if (!response.ok) {
        throw new Error(
          "A server error occurred while trying to create a new post.",
        );
      }

      const rawData = await response.json();
      const createdPost = postSchema.parse(rawData);
      setPosts((prev) => [createdPost, ...prev]);
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const editPost = async (
    id: string,
    { title, description }: PostNonGeneratedProps,
  ) => {
    if (!token) {
      throw new Error("You must be logged in to edit posts.");
    }

    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error("A server error occurred while trying to edit a post.");
      }

      const rawData = await response.json();
      const updatedPost = postSchema.parse(rawData);
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, ...updatedPost } : post,
        ),
      );
    } catch (error) {
      console.error("Error while trying to edit post. Error: ", error);
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    if (!token) {
      throw new Error("You must be logged in to delete posts.");
    }

    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete post.");
      }

      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  };

  return (
    <PostContext
      value={{ posts, isLoading, findPostById, addPost, editPost, deletePost }}
    >
      {children}
    </PostContext>
  );
};
