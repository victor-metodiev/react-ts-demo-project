import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PAGES = [
  { url: "/", text: "Catalog" },
  { url: "/create", text: "Create post" },
];

const getNavLinkStyles = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-sky-300 font-bold hover:text-white transition-colors"
    : "text-white hover:text-sky-200 font-bold transition-colors";

export const Navigation = () => {
  const { logout, user } = useAuth();

  return (
    <nav className="w-full max-w-250 mx-auto px-4 mt-5 grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0">
      <div className="hidden md:block" />

      <ul className="flex justify-center items-center gap-6">
        {PAGES.map(({ url, text }, index) => (
          <li key={index}>
            <NavLink to={url} className={getNavLinkStyles}>
              {text}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="flex justify-center md:justify-end items-center gap-6">
        {user ? (
          <>
            <li>
              <NavLink to="/profile" className={getNavLinkStyles}>
                Profile ({user.firstName || user.email})
              </NavLink>
            </li>
            <li>
              <button
                onClick={logout}
                className="text-white hover:text-red-400 font-bold transition-colors cursor-pointer"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className={getNavLinkStyles}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={getNavLinkStyles}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
