import { Link } from "react-router-dom";

import notFoundSvg from "../assets/notFound.svg";
import { ChevronLeft } from "lucide-react";

function NotFound() {
  return (
    <section className="notFound relative">
      <img src={notFoundSvg} alt="notfound" className="w-full h-screen" />
      <Link
        to="/"
        className="flex justify-between items-center w-fit px-5 py-4 rounded-xl bg-[var(--primary-color)] absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronLeft /> Go To Home
      </Link>
    </section>
  );
}

export default NotFound;
