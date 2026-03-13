import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import defaultPerson from "../assets/defualt-person.svg";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import KnownForSwiper from "../components/KnownForSwiper";

const actorMoviesApi = import.meta.env.VITE_ACTOR_MOVIES;
const actorInfoApi = import.meta.env.VITE_ACTOR_INFO;
const apiKey = import.meta.env.VITE_API_KEY;

function ActorMovies() {
  const [letterShow, setLetterShow] = useState(300);
  const { actorId } = useParams();
  const api_key = apiKey;

  // Actor Info
  const { data: actorInfo, loading: actorInfoLoading } = useFetch(
    `${actorInfoApi}/${actorId}`,
    {
      api_key,
    },
  );

  // Actor Movies
  const { data: actorMovies, loading: actorMoviesLoading } = useFetch(
    `${actorMoviesApi}/${actorId}/movie_credits`,
    {
      api_key,
    },
  );

  useEffect(() => {
    document.title = actorInfo?.name || "Actor";
  }, [actorInfo?.name]);

  const getGender = (genderNum) => {
    switch (genderNum) {
      case 0:
        return "Not specified";
        break;

      case 1:
        return "Female";
        break;

      case 2:
        return "Male";
        break;

      case 3:
        return "Non-binary";
        break;

      default:
        return "Not Found";
        break;
    }
  };

  const getBirthday = (birthday, deathday) => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${birthDate.toDateString()} ${deathday ? "" : `(${age} years old)`}`;
  };
  const getDeathday = (deathday, birthday) => {
    const birthDate = new Date(birthday);
    const deathDate = new Date(deathday);

    let age = deathDate.getFullYear() - birthDate.getFullYear();

    const monthDiff = deathDate.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && deathDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${birthDate.toDateString()} (${age} years old)`;
  };

  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
    console.log(swiperRef);
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };
  console.log(actorInfo);
  console.log(actorMovies);

  // let letterShow = actorInfo?.biography ? actorInfo?.biography.length / 3 : 0;
  const toggleShow = () => {
    setLetterShow((prev) => (prev === 300 ? actorInfo?.biography.length : 300));
  };
  const isExpanded = letterShow !== 300;

  if (actorInfoLoading || actorMoviesLoading) return <Loading />;

  return (
    <section className="actor-movies-page container mx-auto px-4  ">
      <div className="actor-info mt-16 flex flex-col lg:flex-row relative">
        <div className="actor-image w-[300px] h-[450px] rounded-xl mb-6 lg:mb-0 lg:mr-8 self-center lg:self-start">
          <img
            className="w-full h-full object-cover rounded-xl bg-[#dbdbdb] "
            src={
              actorInfo?.profile_path
                ? `https://image.tmdb.org/t/p/w200${actorInfo?.profile_path}`
                : defaultPerson
            }
            alt={actorInfo?.name}
          />

          {/* Personal Info in Large Screen */}
          <div className="content mt-5 space-y-7 hidden lg:block">
            <div className="head relative before:content-[''] before:w-[3px] before:h-full before:bg-[var(--primary-color)] before:absolute before:top-0 before:left-0 mb-5">
              <p className="text-xl font-bold text-[var(--primary-color)] ml-4">
                Personal Info
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-[500] text-[var(--primary-color)]">
                Known For
              </p>
              <p className="">{actorInfo?.known_for_department || "-"}</p>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-[500] text-[var(--primary-color)]">
                Known Credits
              </p>
              <p className="">{actorMovies?.cast?.length || "-"}</p>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-[500] text-[var(--primary-color)]">
                Gender
              </p>
              <p className="">
                {actorInfo?.gender ? getGender(actorInfo?.gender) : "-"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-[500] text-[var(--primary-color)]">
                Birthday
              </p>
              <p className="">
                {actorInfo?.birthday
                  ? getBirthday(actorInfo?.birthday, actorInfo?.deathday)
                  : "-"}
              </p>
            </div>

            {actorInfo?.deathday ? (
              <div className="space-y-1">
                <p className="text-lg font-[500] text-[var(--primary-color)]">
                  Day of Death
                </p>
                <p className="">
                  {getDeathday(actorInfo?.deathday, actorInfo?.birthday)}
                </p>
              </div>
            ) : null}

            <div className="space-y-1">
              <p className="text-lg font-[500] text-[var(--primary-color)]">
                Place of Birth
              </p>
              <p className="font-normal">{actorInfo?.place_of_birth || "-"}</p>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-[500] text-[var(--primary-color)]">
                Also Known As
              </p>
              <p className="whitespace-pre-wrap">
                {actorInfo?.also_known_as.length !== 0
                  ? actorInfo?.also_known_as?.join(", ")
                  : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="info min-w-0 flex-1">
          <div className="header flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
            <h1 className="title text-2xl sm:text-3xl font-semibold">
              {actorInfo?.name}
            </h1>
          </div>
          <div className="biography-container mt-6 mb-10">
            <div className="head relative before:content-[''] before:w-[3px] before:h-full before:bg-[var(--primary-color)] before:absolute before:top-0 before:left-0 mb-5">
              <p className="text-xl font-bold text-[var(--primary-color)] ml-4">
                Biography
              </p>
            </div>
            <div className="biography relative bg-[var(--bg-secondary-color)] h-fit px-4 py-3 rounded-3xl text-sm leading-[1.7]">
              <span>
                {actorInfo?.biography
                  ? actorInfo.biography.slice(0, letterShow)
                  : "No Biography"}
              </span>
              {actorInfo?.biography?.length > 300 && (
                <button
                  onClick={toggleShow}
                  className="text-[var(--primary-color)] ml-2 justify-between items-center gap-1 inline-flex"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          </div>
          <div className="head  mb-5 mt-16 ">
            <div className="flex justify-between items-center relative before:content-[''] before:w-[3px] before:h-full before:bg-[var(--primary-color)] before:absolute before:top-0 before:left-0">
              <p className="text-xl font-bold text-[var(--primary-color)] ml-4">
                Known For
              </p>
              <div className="btns flex justify-center items-center gap-3">
                <FaChevronLeft
                  onClick={handlePrev}
                  className="duration-300 hover:text-[var(--primary-color)] cursor-pointer"
                />
                <FaChevronRight
                  onClick={handleNext}
                  className="duration-300 hover:text-[var(--primary-color)] cursor-pointer"
                />
              </div>
            </div>
            <KnownForSwiper movies={actorMovies?.cast} swiperRef={swiperRef} />
          </div>

          {/* Personal Info in Meduem and Small Screen */}
          <div className="content mt-5 block lg:hidden">
            <div className="head relative before:content-[''] before:w-[3px] before:h-full before:bg-[var(--primary-color)] before:absolute before:top-0 before:left-0 mb-5">
              <p className="text-xl font-bold text-[var(--primary-color)] ml-4">
                Personal Info
              </p>
            </div>

            <div className="space-y-7 mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-lg font-[500] text-[var(--primary-color)]">
                  Known For
                </p>
                <p className="">{actorInfo?.known_for_department || "-"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-lg font-[500] text-[var(--primary-color)]">
                  Known Credits
                </p>
                <p className="">{actorMovies?.cast?.length || "-"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-lg font-[500] text-[var(--primary-color)]">
                  Gender
                </p>
                <p className="">
                  {actorInfo?.gender ? getGender(actorInfo?.gender) : "-"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-lg font-[500] text-[var(--primary-color)]">
                  Birthday
                </p>
                <p className="">
                  {actorInfo?.birthday
                    ? getBirthday(actorInfo?.birthday, actorInfo?.deathday)
                    : "-"}
                </p>
              </div>

              {actorInfo?.deathday ? (
                <div className="space-y-1">
                  <p className="text-lg font-[500] text-[var(--primary-color)]">
                    Day of Death
                  </p>
                  <p className="">
                    {getDeathday(actorInfo?.deathday, actorInfo?.birthday)}
                  </p>
                </div>
              ) : null}

              <div className="space-y-1">
                <p className="text-lg font-[500] text-[var(--primary-color)]">
                  Place of Birth
                </p>
                <p className="font-normal">
                  {actorInfo?.place_of_birth || "-"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-lg font-[500] text-[var(--primary-color)]">
                  Also Known As
                </p>
                <p className="whitespace-pre-wrap">
                  {actorInfo?.also_known_as.length !== 0
                    ? actorInfo?.also_known_as?.join(", ")
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="actor-data"></div>
      </div>
    </section>
  );
}

export default ActorMovies;
