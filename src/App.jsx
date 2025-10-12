import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Genre from "./components/Genre";
import Country from "./components/Country";
import Breadcrumbs from "./components/Breadcrumbs";
import Homepage from "./pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* <Breadcrumbs /> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/genre/country" element={<Country />} />
          <Route path="/country" element={<Country />} />
          {/* <Route path="/bradcrumbs" element={<Bradcrumbs />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
