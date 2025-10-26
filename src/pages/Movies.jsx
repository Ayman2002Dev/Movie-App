import { Outlet } from "react-router-dom";

function Movies() {
  return (
    <div className="movies px-4">
      <Outlet />
    </div>
  );
}

export default Movies;
