import { Link } from "react-router-dom";

import notFoundSvg from "../assets/notFound.svg";
import { ChevronLeft } from "lucide-react";

function NotFound() {
  return (
    <section className="notFound container mx-auto">
      <Link
        to="/"
        className="flex justify-between items-center w-fit px-5 py-4 rounded-xl bg-[var(--bg-secondary-color)] duration-[0.4s] hover:bg-[var(--primary-color)] mt-5"
      >
        <ChevronLeft /> Go To Home
      </Link>
      <img
        src={notFoundSvg}
        alt="notfound"
        className="w-full h-[calc(100vh-200px)]"
      />
    </section>
  );
}

export default NotFound;
