import Slider from "./Slider";
import { Video } from "lucide-react";
import { Link } from "react-router-dom";

function Section(props) {
  const getCategory = (category) => {
    const text = category?.toLowerCase();
    return text?.replace(" ", "_");
  };

  return (
    <>
      {props.toggle ? (
        <section
          className={`container mx-auto movies-section mt-10 block md:hidden`}
        >
          <div className="flex justify-between items-center mb-5">
            <Link
              to={`/category/${getCategory(props.category)}`}
              className="text-xl extraSm:text-lg font-bold text-[var(--primary-color)] border border-[var(--border-color)] px-4 py-2 rounded-lg duration-[0.4s] hover:opacity-70"
            >
              {props.category}
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
      ) : (
        <section className={`movies-section mt-10`}>
          <div className="container flex justify-between items-center mb-5">
            <Link
              to={`/category/${getCategory(props.category)}`}
              className="text-xl extraSm:text-lg font-bold text-[var(--primary-color)] border border-[var(--border-color)] px-4 py-2 rounded-lg duration-[0.4s] hover:opacity-70"
            >
              {props.category}
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
      )}
    </>
  );
}

export default Section;
