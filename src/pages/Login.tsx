import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(formValues.email, formValues.password);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-24 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm bg-slate-800 p-6 rounded-xl border border-blue-900 shadow-md text-white"
      >
        <h2 className="text-2xl font-bold text-center">Log In</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="example.test@gmail.com"
            required
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-blue-500 text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="........."
            required
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-blue-500 text-white"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded transition cursor-pointer"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};
