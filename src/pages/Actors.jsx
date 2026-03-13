import useFetch from "../hooks/useFetch";
import Pagination from "../components/Pagination";
import defaultPerson from "../assets/defualt-person.svg";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect } from "react";

const api = import.meta.env.VITE_ALL_ACTORS;
const api_key = import.meta.env.VITE_API_KEY;
function Actors() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.title = "Actors";
  }, []);

  const { data, loading } = useFetch(api, {
    api_key,
    page: searchParams.get("page") || 1,
  });

  if (loading) return <Loading />;

  return (
    <section className="actors-page">
      <div className="actors-container container mx-auto px-4 my-8">
        <h2 className="font-bold text-xl mb-6">Popular Actors</h2>
        <div className="boxes  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 extraSm:grid gap-5">
          {data?.results?.map((actor) => (
            <Link
              to={`/actors/${actor?.id}`}
              key={actor.id}
              className="box bg-white rounded-xl"
            >
              <img
                className="w-full h-60 object-cover rounded-t-xl bg-[#dbdbdb]"
                src={
                  actor?.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor?.profile_path}`
                    : defaultPerson
                }
                alt={actor.name}
              />
              <div className="actor-info  p-3">
                <p className="name text-black text-sm md:text-md font-semibold">
                  {actor?.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Pagination totalPages={500} />
    </section>
  );
}

export default Actors;
