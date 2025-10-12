import { useDispatch, useSelector } from "react-redux";
import { nextpage, previousPage } from "../store/Slices/PaginaionSlice";

function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  return (
    <section className="pagination pb-2  w-fit m-auto text-white text-center">
      <div className="controls flex justify-center items-center gap-8 py-4">
        <button
          onClick={() => {
            dispatch(previousPage());
          }}
          className="py-2 px-6 bg-[#FF0000] outline-none text-white  text-[18px] rounded-md duration-300 hover:opacity-[0.7]"
        >
          Previous
        </button>
        <p className="currentPage text-2xl">{currentPage}</p>
        <button
          onClick={() => {
            dispatch(nextpage());
          }}
          className="py-2 px-6 bg-[#FF0000] outline-none text-white  text-[18px] rounded-md duration-300 hover:opacity-[0.7]"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Pagination;
