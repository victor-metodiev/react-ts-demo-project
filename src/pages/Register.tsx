import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

type FormErrors = {
  username: string[];
  firstName: string[];
  lastName: string[];
  email: string[];
  password: string[];
  confirmPassword: string[];
};

const initialErrors: FormErrors = {
  username: [],
  firstName: [],
  lastName: [],
  email: [],
  password: [],
  confirmPassword: [],
};

const initialFormValues = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

export const Register = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const errors: FormErrors = {
      username: [],
      firstName: [],
      lastName: [],
      email: [],
      password: [],
      confirmPassword: [],
    };

    if (formValues.username.trim().length === 0) {
      errors.username.push("Username must be at least 1 character long.");
    }
    if (formValues.firstName.trim().length === 0) {
      errors.firstName.push("First name must be at least 1 character long.");
    }
    if (formValues.lastName.trim().length === 0) {
      errors.lastName.push("Last name must be at least 1 character long.");
    }
    if (formValues.email.trim().length === 0) {
      errors.email.push(
        "Email must be at least 1 character long and correct format.",
      );
    }
    if (formValues.password.length < 4) {
      errors.password.push("Password must be at least 4 character long.");
    }
    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword.push("Passwords do not match.");
    }

    const hasErrors = Object.values(errors).some(
      (fieldErrors) => fieldErrors.length > 0,
    );

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const registerPayload = {
        username: formValues.username.trim(),
        email: formValues.email.trim(),
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        password: formValues.password,
      };

      await register(registerPayload);
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
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-slate-800 p-6 rounded-xl border border-blue-900 shadow-md text-white"
      >
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        {serverError && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded text-center">
            {serverError}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="johndoe"
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-blue-500 text-white"
          />
          {formErrors.username.map((error, index) => (
            <span key={index} className="text-red-400 text-xs">
              {error}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              placeholder="John"
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-blue-500 text-white"
            />
            {formErrors.firstName.map((error, index) => (
              <span key={index} className="text-red-400 text-xs">
                {error}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-sm font-medium text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-blue-500 text-white"
            />
            {formErrors.lastName.map((error, index) => (
              <span key={index} className="text-red-400 text-xs">
                {error}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-blue-500 text-white"
          />
          {formErrors.email.map((error, index) => (
            <span key={index} className="text-red-400 text-xs">
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="........."
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-blue-500 text-white"
          />
          {formErrors.password.map((error, index) => (
            <span key={index} className="text-red-400 text-xs">
              {error}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder="........."
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded focus:outline-none focus:border-blue-500 text-white"
          />
          {formErrors.confirmPassword.map((error, index) => (
            <span key={index} className="text-red-400 text-xs">
              {error}
            </span>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-2 rounded transition cursor-pointer"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};
