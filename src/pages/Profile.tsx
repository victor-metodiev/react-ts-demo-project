import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { formatDate } from "../utils/formatDate";

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center items-center my-24">
        <p className="text-white text-lg">
          Login to view your profile or{" "}
          <NavLink
            to="/register"
            className={
              "text-blue-900 text-bold hover:text-blue-700 hover:underline"
            }
          >
            sign up
          </NavLink>{" "}
          if you haven't already.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center my-16 px-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-md bg-slate-800 p-8 rounded-xl border border-blue-900 shadow-lg text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {user.firstName} {user.lastName}S
          </h2>
          <p className="text-sky-400 text-sm font-medium">@{user.username}</p>
        </div>

        <div className="w-full bg-slate-900/60 rounded-lg p-4 border border-slate-700/50 flex flex-col gap-3 text-sm">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-gray-400">Email:</span>
            <span className="font-medium text-gray-200">{user.email}</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-gray-400">Member Since:</span>
            <span className="font-medium text-gray-200">
              {formatDate(user.createdAt)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">User ID:</span>
            <span className="font-mono text-gray-400 text-xs">{user.id}</span>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full mt-2 bg-red-600/80 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
