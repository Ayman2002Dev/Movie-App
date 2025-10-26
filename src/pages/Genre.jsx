import { Outlet } from "react-router-dom";

function Genre() {
  return (
    <section className="genre-page container mx-auto px-5 mb-5">
      <Outlet />
    </section>
  );
}

export default Genre;
