import { BiCameraMovie } from "react-icons/bi";
import { BiSolidMoviePlay } from "react-icons/bi";
import Slider from "./Slider";

function Section(props) {
  return (
    <section className={`${props.headText}-section mt-12`}>
      <div className="container flex justify-between items-center mb-5">
        <a
          href="#"
          className="text-xl font-bold text-[var(--primary-color)] border border-[var(--border-color)] px-4 py-2 rounded-lg duration-[0.4s] hover:opacity-70"
        >
          {props.filter}
        </a>
        <div className="box flex justify-center items-center">
          <h2 className="text-2xl font-bold text-[var(--primary-color)] mr-2">
            {props.headText}
          </h2>
          {props.headText === "Movies" ? (
            <BiCameraMovie color="var(--primary-color)" size={30} />
          ) : (
            <BiSolidMoviePlay color="var(--primary-color)" size={30} />
          )}
        </div>
      </div>
      <Slider data={props.data} />
    </section>
  );
}

export default Section;
