type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed ${currentPage > 1 ? "hover:bg-slate-700" : ""} transition`}
      >
        Previous
      </button>
      <span className="text-slate-400 text-sm px-2">
        Page <strong className="text-white">{currentPage}</strong> of{" "}
        <strong className="text-white">{totalPages}</strong>
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed ${currentPage !== totalPages ? "hover:bg-slate-700" : ""} transition hover:cursor-pointer`}
      >
        Next
      </button>
    </div>
  );
};
