import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Pagination({ totalPages = 500 }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);

  const handlePage = (currentPage) => {
    setPage(currentPage);
  };

  useEffect(() => {
    setSearchParams({ page });
  }, [page]);

  const visiblePages = 6;

  let startPage = Math.max(1, page - 1);
  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <section className="pagination container px-4 my-5 w-fit mx-auto text-white text-center">
      <div className="controls flex justify-between items-center gap-3">
        {page < totalPages && (
          <button
            onClick={() => handlePage(page + 1)}
            className="previous-btn w-10 h-10 rounded-full flex justify-center items-center bg-[var(--bg-secondary-color)] text-white text-[18px] duration-300 hover:opacity-70"
          >
            <ChevronsLeft />
          </button>
        )}

        <div className="bollets flex justify-center gap-3 items-center flex-row-reverse flex-wrap">
          {startPage > 3 && (
            <>
              <button
                onClick={() => handlePage(1)}
                className={`bollet w-10 h-10 rounded-full bg-[var(--bg-secondary-color)] text-sm font-semibold flex items-center justify-center duration-[0.4s] hover:opacity-70 ${
                  page === 1 ? "bg-[var(--primary-color)]" : ""
                }`}
              >
                1
              </button>
              <div className="bollet w-10 h-10 rounded-full bg-[var(--bg-secondary-color)] flex items-center justify-center">
                ...
              </div>
            </>
          )}
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => handlePage(p)}
              className={`bollet w-10 h-10 rounded-full bg-[var(--bg-secondary-color)] text-sm font-semibold flex items-center justify-center duration-[0.4s] hover:opacity-70 ${
                page === p ? "bg-[var(--primary-color)]" : ""
              }`}
            >
              {p}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              <div className="bollet w-10 h-10 rounded-full bg-[var(--bg-secondary-color)] flex items-center justify-center">
                ...
              </div>
              <button
                onClick={() => handlePage(totalPages)}
                className={`bollet w-10 h-10 rounded-full bg-[var(--bg-secondary-color)] text-sm font-semibold flex items-center justify-center duration-[0.4s] hover:opacity-70 ${
                  page === totalPages ? "bg-[var(--primary-color)]" : ""
                }`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {page > 1 && (
          <button
            onClick={() => handlePage(page - 1)}
            className="next-btn w-10 h-10 rounded-full flex justify-center items-center bg-[var(--bg-secondary-color)] text-white text-[18px] duration-300 hover:opacity-70"
          >
            <ChevronsRight />
          </button>
        )}
      </div>
    </section>
  );
}

export default Pagination;
