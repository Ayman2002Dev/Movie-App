import Slider from "./Slider";
import { Video } from "lucide-react";
import { Link } from "react-router-dom";

function SectionSwiper(props) {
  const getName = (name) => {
    const text = name.toLowerCase();
    return text.replace(" ", "_");
  };

  return (
    <>
      <section className="movies-section mt-10">
        <div className="container flex justify-between items-center mb-5">
          <Link
            to={`/genres/${getName(props.name)}`}
            className="text-xl extraSm:text-lg font-bold text-[var(--primary-color)] border border-[var(--border-color)] px-4 py-2 rounded-lg duration-[0.4s] hover:opacity-70"
          >
            {props.name}
          </Link>
          <div className="box flex justify-center items-center">
            <h2 className="text-2xl extraSm:xl font-bold text-[var(--primary-color)] mr-2">
              Movies
            </h2>
            <Video color="var(--primary-color)" size={30} />
          </div>
        </div>
        <Slider data={props.data} />
      </section>
    </>
  );
}

export default SectionSwiper;
