import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../../context/postContext";
import { Spinner } from "../../components/Spinner";
import { EditPostForm } from "./EditPostForm";

export const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { findPostById, isLoading } = usePost();

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
            The post you're trying to edit doesn't exist or has been deleted.
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

  return <EditPostForm key={post.id} post={post} />;
};
