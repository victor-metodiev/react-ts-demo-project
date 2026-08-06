import { useNavigate } from "react-router-dom";
import type { Post } from "../pages/Catalog";

type CatalogListingProps = { posts: Post[] };

export const CatalogListing = ({ posts }: CatalogListingProps) => {
  const navigate = useNavigate();

  return (
    <ul className="grid grid-cols-2 gap-4">
      {posts.map(({ title, body, id }) => (
        <li
          key={String(id)}
          onClick={() => navigate(`/posts/${id}`)}
          className="border-2 border-blue-800 px-6 py-4 flex flex-col gap-3 items-center rounded-xl hover:cursor-pointer"
        >
          <h4 className="text-white text-center font-semibold">{title}</h4>
          <p className="text-white">{body}</p>
        </li>
      ))}
    </ul>
  );
};
