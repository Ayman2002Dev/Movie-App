import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Category from "./pages/Category";
import Country from "./components/Country";
import MainLayout from "./layouts/mainLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Movies from "./pages/movies";
import MovieDetails from "./pages/MovieDetails";
import Credits from "./pages/Credits";
import Genre from "./pages/Genre";
import FetchGenre from "./pages/FetchGenre";
import GenresList from "./pages/GenresList";

function App() {
  return (
    <div className="App scrollable">
      <BrowserRouter>
        {/* <Breadcrumbs />  */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/genre/country" element={<Country />} /> */}
            {/* <Route path="/country" element={<Country />} /> */}

            {/* Movies */}
            <Route path="/movies" element={<Movies />}>
              <Route index element={<Home />} />
              <Route path=":movieId" element={<MovieDetails />} />
              <Route path=":movieId/credits" element={<Credits />} />
            </Route>

            {/* Gener */}
            <Route path="/genres" element={<Genre />}>
              <Route index element={<GenresList />} />
              <Route path=":genreName" element={<FetchGenre />} />
            </Route>

            <Route path="/category/:category" element={<Category />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
