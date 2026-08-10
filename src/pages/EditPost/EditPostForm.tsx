import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost, type Post } from "../../context/postContext";

type FormErrors = {
  title: string[];
  description: string[];
};

export const EditPostForm = ({ post }: { post: Post }) => {
  const [form, setForm] = useState({
    title: post.title,
    description: post.description,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: [],
    description: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { editPost } = usePost();

  const handleFormValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const onFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = form.title.trim();
    const description = form.description.trim();

    const errors: FormErrors = { title: [], description: [] };

    if (title.length === 0) {
      errors.title.push("Title must be at least 1 character long.");
    }
    if (description.length === 0) {
      errors.description.push("Description must be at least 1 character long.");
    }

    if (errors.title.length > 0 || errors.description.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      await editPost(post.id, { title, description });
      navigate(`/posts/${post.id}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-135 mx-auto my-12 text-white gap-4">
      <button
        onClick={() => navigate(-1)}
        className="self-start text-slate-400 hover:text-sky-300 font-semibold text-sm transition cursor-pointer flex items-center gap-1"
      >
        ← Cancel
      </button>

      <form
        onSubmit={onFormSubmit}
        className="w-full bg-slate-800 p-8 rounded-xl border border-slate-700/80 shadow-xl flex flex-col gap-6"
      >
        <h2 className="text-2xl font-extrabold text-white tracking-tight border-b border-slate-700/60 pb-4">
          Edit Post
        </h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleFormValueChange}
            placeholder="Enter post title..."
            className="bg-slate-900 border border-slate-700 focus:border-blue-500 text-white px-4 py-2.5 rounded-lg outline-none transition text-sm"
          />
          {formErrors.title.map((error, index) => (
            <span key={index} className="text-red-400 text-xs font-medium">
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            value={form.description}
            onChange={handleFormValueChange}
            placeholder="Write your post content here..."
            className="bg-slate-900 border border-slate-700 focus:border-blue-500 text-white px-4 py-2.5 rounded-lg outline-none transition text-sm resize-none leading-relaxed"
          />
          {formErrors.description.map((error, index) => (
            <span key={index} className="text-red-400 text-xs font-medium">
              {error}
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2.5 px-5 rounded-lg transition cursor-pointer text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2.5 px-6 rounded-lg transition cursor-pointer text-sm"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
