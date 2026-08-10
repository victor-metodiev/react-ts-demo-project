import { useState } from "react";
import { Spinner } from "../../components/Spinner";
import { usePost } from "../../context/postContext";
import { CatalogListing } from "./CatalogListing";
import { Pagination } from "../../components/Pagination";

const POSTS_PER_PAGE = 6;

export const Catalog = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, isLoading } = usePost();

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const filteredPosts = sortedPosts.filter((post) =>
    post.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const getCatalogListingContent = () => {
    if (isLoading) {
      return (
        <div className="my-12">
          <Spinner />
        </div>
      );
    }

    if (sortedPosts.length === 0) {
      return (
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-8 text-center text-slate-400 w-100">
          No posts found yet. Create the first one after you login or sign up!
        </div>
      );
    }

    if (filteredPosts.length === 0) {
      return (
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-8 text-center text-slate-400 w-100">
          No posts found matching "{searchInput}".
        </div>
      );
    }

    return (
      <>
        <CatalogListing posts={paginatedPosts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col items-center mx-4 w-auto md:w-250 md:mx-auto my-12 gap-8">
      <div className="text-center flex flex-col gap-2">
        <h2 className="font-bold text-3xl text-white">Posts</h2>
      </div>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search posts by title"
          value={searchInput}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {getCatalogListingContent()}
    </div>
  );
};
