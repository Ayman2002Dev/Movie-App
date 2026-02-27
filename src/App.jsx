import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Category from "./pages/Category";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Credits from "./pages/Credits";
import Genre from "./pages/Genre";
import FetchGenre from "./pages/FetchGenre";
import GenresList from "./pages/GenresList";
import MoviesList from "./pages/MoviesList";
import FetchCountry from "./pages/FetchCountry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          {/* Movies */}
          <Route path="/movies" element={<Movies />}>
            <Route index element={<MoviesList />} />
            <Route path=":movieId" element={<MovieDetails />} />
            <Route path=":movieId/credits" element={<Credits />} />
          </Route>

          <Route path="/country/:countryName" element={<FetchCountry />} />

          {/* Genre */}
          <Route path="/genres" element={<Genre />}>
            <Route index element={<GenresList />} />
            <Route path=":genreName" element={<FetchGenre />} />
          </Route>

          <Route path="/category/:category" element={<Category />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
