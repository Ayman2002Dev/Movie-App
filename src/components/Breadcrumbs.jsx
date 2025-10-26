import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const currentLocation = useLocation();
  const pathname = currentLocation.pathname.split("/").filter((x) => x);
  let paths = pathname.map((path) => {
    return <Link to={path}>{path} &gt; </Link>;
  });
  return (
    <>
      <div className="w-full h-fit p-3 bg-slate-400">
        {" "}
        <Link to="/">Home</Link> &gt; {paths}
      </div>
    </>
  );
}

export default Breadcrumbs;
