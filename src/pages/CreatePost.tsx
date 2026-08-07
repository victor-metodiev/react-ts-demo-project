import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormErrors = {
  title: string[];
  description: string[];
};

export const CreatePost = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [formError, setFormErrors] = useState<FormErrors>({
    title: [],
    description: [],
  });

  const navigate = useNavigate();

  const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: description,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      setForm(() => ({ title: "", description: "" }));
      navigate("/");
    } catch (error) {
      console.error(
        "Error occured while trying to create a new post. Error: ",
        error,
      );
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col gap-4 my-14 w-135 mx-auto"
    >
      <div className="flex flex-col gap-1 opacity-80">
        <span>Title</span>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleFormValueChange}
          className="border px-3 py-2 rounded-xl outline-none"
        />
        <div className="flex flex-col gap-1">
          {formError.title.map((error, index) => (
            <span key={index} className="text-red-500 text-sm">
              {error}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1 opacity-80">
        <span>Description</span>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleFormValueChange}
          className="border px-3 py-2 rounded-xl outline-none"
        />
        <div className="flex flex-col gap-1">
          {formError.description.map((error, index) => (
            <span key={index} className="text-red-500 text-sm">
              {error}
            </span>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="border px-3 py-2 rounded-xl bg-blue-600 border-blue-800 outline-none text-white hover:cursor-pointer hover:bg-blue-500 hover:border-blue-600"
      >
        Create
      </button>
    </form>
  );
};
