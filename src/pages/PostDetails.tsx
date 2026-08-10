import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../context/postContext";
import { useAuth } from "../context/authContext";
import { Spinner } from "../components/Spinner";
import { formatDate } from "../utils/formatDate";

export const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deletePost, findPostById, isLoading } = usePost();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-24">
        <Spinner />
      </div>
    );
  }

  const post = id ? findPostById(id) : undefined;
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center my-24 text-white">
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700/80 shadow-lg text-center flex flex-col gap-4 w-100">
          <h3 className="text-xl font-bold text-slate-200">Post Not Found</h3>
          <p className="text-slate-400 text-sm">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const { title, description, authorName, userId, createdAt } = post;
  const isAuthor = user && user.id === userId;

  const onDeleteClick = async () => {
    if (!id) {
      return;
    }

    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        navigate("/");
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-175 mx-auto my-12 text-white gap-4">
      <button
        onClick={() => navigate("/")}
        className="self-start text-slate-400 hover:text-sky-300 font-semibold text-sm transition cursor-pointer flex items-center gap-1"
      >
        ← Back to Catalog
      </button>

      <div className="w-full bg-slate-800 p-8 rounded-xl border border-slate-700/80 shadow-xl flex flex-col gap-6">
        <div className="flex flex-col gap-3 border-b border-slate-700/60  pb-4">
          <h2 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
            {title}
          </h2>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium text-slate-300 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
              By {authorName}
            </span>
            <span>Published on {formatDate(createdAt)}</span>
          </div>
        </div>

        <p className="text-slate-200 text-base">{description}</p>

        {isAuthor && (
          <div className="flex gap-3 justify-end border-t border-slate-700/60 pt-5 mt-2">
            <button
              onClick={() => navigate(`/posts/${id}/edit`)}
              className="bg-amber-600/90 hover:bg-amber-600 text-white font-semibold py-2 px-5 rounded-lg transition cursor-pointer"
            >
              Edit Post
            </button>
            <button
              onClick={onDeleteClick}
              className="bg-red-600/90 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg transition cursor-pointer"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
