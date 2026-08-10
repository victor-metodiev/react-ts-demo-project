import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../context/postContext";

type FormErrors = {
  title: string[];
  description: string[];
};

export const CreatePost = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: [],
    description: [],
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addPost } = usePost();
  const navigate = useNavigate();

  const handleFormValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const onFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

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

    setIsSubmitting(true);

    try {
      await addPost({ title, description });
      setForm({ title: "", description: "" });
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      }

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-16 px-4">
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-slate-800 p-6 rounded-xl border border-blue-900 shadow-md text-white"
      >
        <h2 className="text-2xl font-bold text-center">Create Post</h2>

        {serverError && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded text-center">
            {serverError}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleFormValueChange}
            placeholder="Enter post title"
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-blue-500 text-white"
          />
          {formErrors.title.map((error, index) => (
            <span key={index} className="text-red-400 text-xs">
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleFormValueChange}
            placeholder="Write your post description here..."
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-blue-500 text-white resize-none"
          />
          {formErrors.description.map((error, index) => (
            <span key={index} className="text-red-400 text-xs">
              {error}
            </span>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded transition cursor-pointer"
        >
          {isSubmitting ? "Creating..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};
