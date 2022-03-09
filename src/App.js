import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import loadMovies from "./Utils/Axios";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const movies = await loadMovies();
      setMovies(movies);
    })();
  }, []);

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route path="/Movie/:movieId" element={<Movie />} />
      </Routes>
    </div>
  );
}

export default App;
