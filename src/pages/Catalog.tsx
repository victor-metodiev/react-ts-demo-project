import { useEffect, useState } from "react";
import { CatalogListing } from "../components/CatalogListing";
import { Spinner } from "../components/Spinner";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const TOTAL_PAGES = 10;

export const Catalog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
      {},
    )
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setIsLoading(false);
          setPosts(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div className="flex flex-col gap-6 items-center my-14">
      <h2 className="font-bold text-3xl text-white">Posts</h2>
      {isLoading ? <Spinner /> : <CatalogListing posts={posts} />}

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>

        <span className="text-white font-medium">
          Page {page} of {TOTAL_PAGES}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, TOTAL_PAGES))}
          disabled={page === TOTAL_PAGES}
          className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};
