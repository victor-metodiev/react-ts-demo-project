import { NavLink } from "react-router-dom";

const PAGES = [
  { url: "/", text: "Catalog" },
  { url: "create", text: "Create post" },
];

export const Navigation = () => {
  return (
    <nav>
      <ul className="flex justify-center mt-4 gap-4">
        {PAGES.map(({ url, text }, index) => (
          <li key={String(index)}>
            <NavLink
              to={url}
              className={({ isActive }) =>
                isActive
                  ? "text-sky-300 font-bold hover:text-white"
                  : "text-white hover:text-sky-200 font-bold"
              }
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
