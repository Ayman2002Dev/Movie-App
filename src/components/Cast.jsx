import { Users } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import defaultuser from "../assets/default_user.png";
import { castMovie, clearCast } from "../store/Slices/fetchMovieSlice";
import Loading from "./Loading";

function Cast() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const castList = useSelector((state) => state.fetchMovie.credits);
  const castData = castList.data.cast;

  const topTen = castData?.slice(0, 10);

  useEffect(() => {
    dispatch(clearCast());
    dispatch(castMovie(movieId));
  }, [movieId, dispatch]);

  const actors = topTen?.map((actor) => {
    return (
      <div
        key={actor.id}
        className="actor flex items-center bg-gradient-to-r from-[var(--bg-secondary-color)] from-50% via-[#171b26] to-[var(--bg-color)] rounded-full pr-1 cursor-pointer duration-[0.4s] hover:shadow-md hover:shadow-white/20 group"
      >
        <div className="profile-image w-[70px] h-[70px] rounded-full bg-blue-600 mr-4 overflow-hidden">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor?.profile_path}`
                : defaultuser
            }
            alt="actor-profile"
            className="w-full h-full rounded-full object-cover duration-[0.4s] group-hover:scale-110"
          />
        </div>
        <div className="actor-info">
          <p className="name text-sm font-semibold group-hover:underline">
            {actor.name}
          </p>
          <p className="character text-[12px] group-hover:underline">
            {actor.character}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="cast container mx-auto my-12">
      <Link
        to={`/movies/${movieId}/credits`}
        className="cast-container flex items-center"
      >
        <Users color="var(--primary-color)" size={35} />
        <h1 className="title text-2xl font-bold ml-2 text-[var(--primary-color)]">
          Cast
        </h1>
      </Link>
      <div className="relative actors-container mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {castList.loading ? (
          <Loading />
        ) : castData.length === 0 ? (
          <h1>No Cast Available</h1>
        ) : (
          actors
        )}
      </div>
    </div>
  );
}

export default Cast;
