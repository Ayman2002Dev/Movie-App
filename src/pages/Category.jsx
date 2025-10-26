import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCategoryMovies } from "../store/Slices/MovieSlice";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import logo from "../assets/logo.png";

function Category() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { fetchCategory: categoryList } = useSelector((state) => state.movies);
  const categoryData = categoryList.data;
  console.log(category);

  const currentPage = useSelector((state) => state.pagination.currentPage);

  useEffect(() => {
    dispatch(fetchCategoryMovies({ category, currentPage }));
  }, [category, currentPage]);

  return (
    <>
      {categoryData.length === 0 || categoryList.loading ? (
        <Loading />
      ) : (
        <>
          <section className="relative container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-4 mt-10 mb-10">
            {categoryData.map((movie) => {
              return (
                <div
                  key={movie.id}
                  className="relative  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/90 after:to-transparent after:rounded-3xl duration-[0.4s] overflow-hidden group"
                >
                  <div className="rating absolute top-4 left-4 z-10 w-11 h-11 rounded-full bg-black/50 border-2 border-[var(--primary-color)] flex justify-center items-center movies-center pointer-events-none">
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <p className="line-clamp-4 overview-slider text-[12px] absolute -bottom-full duration-[0.3s]  left-2 z-10 pointer-events-none group-hover:bottom-[20%]">
                    {movie.overview}
                  </p>
                  <Link
                    to={`/movies/${movie.id}`}
                    className="main relative block duration-[0.4s] before:content-[''] before:absolute before:left-0 before:bottom-0  before:w-full before:h-0 hover:before:bg-black/50 hover:before:h-full rounded-3xl overflow-hidden aspect-[2/3]"
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : `${logo}`
                      }
                      alt={movie.title}
                      className="rounded-lg w-full  h-full  object-cover object-center"
                    />
                    <div className="absolute bottom-4 left-2 px-2 rounded z-10">
                      <p className="text-l font-bold text-white">
                        {movie.title ? movie.title : movie.name}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </section>
          <Pagination />
        </>
      )}
    </>
  );
}

export default Category;
