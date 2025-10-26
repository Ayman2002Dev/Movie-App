import { useDispatch, useSelector } from "react-redux";
import {
  nextpage,
  previousPage,
  setPage,
} from "../store/Slices/PaginaionSlice";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, lastPage } = useSelector((state) => state.pagination);

  const visiblePages = 6;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = startPage + visiblePages - 1;

  if (endPage > lastPage) {
    endPage = lastPage;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <section className="pagination container my-5 w-fit mx-auto text-white text-center">
      <div className="controls flex justify-between items-center gap-3">
        {currentPage < lastPage && (
          <button
            onClick={() => dispatch(nextpage(currentPage))}
            className="previous-btn w-10 h-10 rounded-full flex justify-center items-center bg-[var(--bg-secondary-color)] text-white text-[18px] duration-300 hover:opacity-70"
          >
            <ChevronsLeft />
          </button>
        )}

        <div className="bollets flex justify-center gap-3 items-center flex-row-reverse flex-wrap">
          {startPage > 3 && (
            <>
              <button
                onClick={() => dispatch(setPage(1))}
                className={`bollet w-10 h-10 rounded-full bg-[var(--bg-secondary-color)] text-sm font-semibold flex items-center justify-center duration-[0.4s] hover:opacity-70 ${
                  currentPage === 1 ? "bg-[var(--primary-color)]" : ""
                }`}
              >
                1
              </button>
              <div className="bollet w-10 h-10 rounded-full bg-[var(--bg-secondary-color)] flex items-center justify-center">
                ...
              </div>
            </>
          )}
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => dispatch(setPage(page))}
              className={`bollet w-10 h-10 rounded-full bg-[var(--bg-secondary-color)] text-sm font-semibold flex items-center justify-center duration-[0.4s] hover:opacity-70 ${
                currentPage === page ? "bg-[var(--primary-color)]" : ""
              }`}
            >
              {page}
            </button>
          ))}

          {endPage < lastPage && (
            <>
              <div className="bollet w-10 h-10 rounded-full bg-[var(--bg-secondary-color)] flex items-center justify-center">
                ...
              </div>
              <button
                onClick={() => dispatch(setPage(lastPage))}
                className={`bollet w-10 h-10 rounded-full bg-[var(--bg-secondary-color)] text-sm font-semibold flex items-center justify-center duration-[0.4s] hover:opacity-70 ${
                  currentPage === lastPage ? "bg-[var(--primary-color)]" : ""
                }`}
              >
                {lastPage}
              </button>
            </>
          )}
        </div>

        {currentPage > 1 && (
          <button
            onClick={() => dispatch(previousPage(currentPage))}
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
