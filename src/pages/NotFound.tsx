import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center my-20 text-white px-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl border border-slate-700/80 text-center flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-sky-200">
            404
          </span>
          <div className="h-1 w-12 bg-blue-500 rounded-full" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-100">Page Not Found</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Oops! The page you are looking for doesn't exist, was removed, or
            had its name changed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-slate-700/80 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 px-4 rounded-lg transition cursor-pointer text-sm border border-slate-600/50"
          >
            ← Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg transition cursor-pointer text-sm shadow-md shadow-blue-900/30"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
