import { useEffect, useState } from "react";
import { CatalogListing } from "../components/CatalogListing";
import { Spinner } from "../components/Spinner";
import { Pagination } from "../components/Pagination";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const Catalog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch(`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10`)
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
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center my-14">
      <h2 className="font-bold text-3xl text-white">Posts</h2>
      {isLoading ? <Spinner /> : <CatalogListing posts={posts} />}
      <Pagination />
    </div>
  );
};
