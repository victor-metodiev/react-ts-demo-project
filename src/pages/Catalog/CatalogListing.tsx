import { useNavigate } from "react-router-dom";
import type { Post } from "../../context/postContext";

type CatalogListingProps = { posts: Post[] };

export const CatalogListing = ({ posts }: CatalogListingProps) => {
  const navigate = useNavigate();

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map(({ id, title, description }) => (
        <li
          key={String(id)}
          onClick={() => navigate(`/posts/${id}`)}
          className="border-2 border-blue-900  bg-slate-800 px-6 py-4 flex flex-col gap-3 items-center rounded-xl hover:cursor-pointer hover:bg-slate-700 hover:border-blue-950"
        >
          <h4 className="text-white text-center font-semibold">{title}</h4>
          <p className="text-white">{description}</p>
        </li>
      ))}
    </ul>
  );
};
