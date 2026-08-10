import { createContext, useContext } from "react";

export type Post = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userId: string;
  authorName: string;
};

export type PostNonGeneratedProps = {
  title: string;
  description: string;
};

export type PostContextProps = {
  posts: Post[];
  isLoading: boolean;
  findPostById: (id: string) => Post | undefined;
  addPost: (payload: PostNonGeneratedProps) => Promise<void>;
  editPost: (id: string, payload: PostNonGeneratedProps) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
};

export const PostContext = createContext<PostContextProps | undefined>(
  undefined,
);

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProviders");
  }

  return context;
};
