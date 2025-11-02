import Slider from "./Slider";
import { Video } from "lucide-react";
import { Link } from "react-router-dom";

function SectionSwiper(props) {
  const getName = (name) => {
    const text = name?.toLowerCase();
    return text?.replace(" ", "_");
  };

  return (
    <>
      {props?.data?.length > 0 && (
        <section className="movies-section container mx-auto mt-10 mb-5">
          {props.country ? (
            <div className="flex justify-between items-center mb-5">
              <Link
                to={`/${getName(props.country)}`}
                className="text-xl extraSm:text-lg font-bold text-[var(--primary-color)] border border-[var(--border-color)] px-4 py-2 rounded-lg duration-[0.4s] hover:opacity-70"
              >
                {props.country || "Unknown Country"}
              </Link>
              <div className="box flex justify-center items-center">
                <h2 className="text-2xl extraSm:xl font-bold text-[var(--primary-color)] mr-2">
                  Movies
                </h2>
                <Video color="var(--primary-color)" size={30} />
              </div>
            </div>
          ) : props.name ? (
            <div className="flex justify-between items-center mb-5">
              <Link
                to={`/genres/${getName(props.name)}`}
                className="text-xl extraSm:text-lg font-bold text-[var(--primary-color)] border border-[var(--border-color)] px-4 py-2 rounded-lg duration-[0.4s] hover:opacity-70"
              >
                {props.name || "Unknown Genre"}
              </Link>
              <div className="box flex justify-center items-center">
                <h2 className="text-2xl extraSm:xl font-bold text-[var(--primary-color)] mr-2">
                  Movies
                </h2>
                <Video color="var(--primary-color)" size={30} />
              </div>
            </div>
          ) : null}

          <Slider data={props.data} />
        </section>
      )}
    </>
  );
}

export default SectionSwiper;
