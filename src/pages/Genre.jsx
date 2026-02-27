import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

function Genre() {
  const { genreName } = useParams();
  useEffect(() => {
    document.title = genreName;
  }, [genreName]);
  return (
    <section className="genre-page container mx-auto  mb-5">
      <Outlet />
    </section>
  );
}

export default Genre;
