import { Link, useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import Loading from "../components/Loading";
import SectionFixedFull from "../components/SectionFixedFull";
import defaultPerson from "../assets/defualt-person.svg";
import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState(searchParams.get("type") || "all");
  const query = searchParams.get("q");

  const { results, loading } = useDebounce({ query, delay: 500 });
  const { person = [], movies = [] } = results || {};
  console.log(results);

  useEffect(() => {
    document.title = query || "Search";
    setType("all");
  }, [query]);

  const handleType = (type) => {
    setType(type);
    setSearchParams((prev) => {
      prev.set("type", type);
      return prev;
    });
  };

  const movieShow = type === "movie" || type === "all";
  const personShow = type === "person" || type === "all";
  return (
    <section className="searchPage container mx-auto mt-8">
      {loading ? (
        <Loading />
      ) : movies.length === 0 && person.length === 0 ? (
        <h1>No Results Found</h1>
      ) : (
        <>
          <div className="header flex justify-center sm:justify-between items-center gap-4  flex-wrap px-4 sm:px-0">
            <div className="left flex justify-center items-center gap-[2px] relative before:content-[''] before:absolute before:-bottom-[2px] before:left-0 before:w-[120px] before:h-[3px] before:bg-[var(--primary-color)] after:content-[''] after:absolute after:left-[37px] after:-bottom-[3px] after:w-[6px] after:h-[6px] after:rounded-full after:bg-[var(--bg-color)]">
              <SearchIcon size={30} color="#f00" className="rotate-90" />
              <p className="text-xl font-[500] text-[var(--primary-color)] after:content-[''] after:absolute after:left-[77px] after:-bottom-[3px] after:w-[6px] after:h-[6px] after:rounded-full after:bg-[var(--bg-color)]">
                Search results for: {query} {type}
              </p>
            </div>
            <div className="right filter flex justify-center items-center gap-4">
              <button
                onClick={() => {
                  handleType("all");
                }}
                className={`${type === "all" ? "text-[var(--primary-color)] before:content-[''] before:absolute before:right-0 before:-bottom-2 before:bg-[var(--primary-color)] before:w-[60%] before:h-[3px]" : "before:content-[''] before:absolute before:right-0 before:-bottom-2 before:bg-white before:w-0 before:h-[3px] before:transition-all before:duration-300 hover:before:w-[60%]"} text-[15px] relative `}
              >
                All
              </button>
              <button
                onClick={() => {
                  handleType("movie");
                }}
                className={`${type === "movie" ? "text-[var(--primary-color)] before:content-[''] before:absolute before:right-0 before:-bottom-2 before:bg-[var(--primary-color)] before:w-[60%] before:h-[3px]" : "before:content-[''] before:absolute before:right-0 before:-bottom-2 before:bg-white before:w-0 before:h-[3px] before:transition-all before:duration-300 hover:before:w-[60%]"} text-[15px] relative `}
              >
                Movie
              </button>
              <button
                onClick={() => {
                  handleType("person");
                }}
                className={`${type === "person" ? "text-[var(--primary-color)] before:content-[''] before:absolute before:right-0 before:-bottom-2 before:bg-[var(--primary-color)] before:w-[60%] before:h-[3px]" : "before:content-[''] before:absolute before:right-0 before:-bottom-2 before:bg-white before:w-0 before:h-[3px] before:transition-all before:duration-300 hover:before:w-[60%]"} text-[15px] relative `}
              >
                Person
              </button>
            </div>
          </div>
          <div className="search-results">
            {movieShow && <SectionFixedFull data={movies} />}
            {personShow && (
              <div className="person-results grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 justify-between w-full mt-8">
                {person.map((p) => (
                  <Link
                    to={`/actors/${p.id}`}
                    key={`person-${p.id}`}
                    className="rounded-full"
                  >
                    <div className="flex items-center gap-3 flex-col">
                      <img
                        className="rounded-full w-[90px] h-[90px] object-cover bg-white"
                        src={
                          p.profile_path
                            ? `https://image.tmdb.org/t/p/w500${p.profile_path}`
                            : defaultPerson
                        }
                        alt={p.name}
                      />
                      <p className="text-[13px] font-semibold text-[#afb9be] truncate hover:text-white">
                        {p.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Search;
