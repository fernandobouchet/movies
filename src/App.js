import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadMovies } from "./components/Utils/Axios";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";

function App() {
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const movies = await loadMovies(page);
      setMovies(movies);
    })();
  }, [page]);

  function changePage(e) {
    setPage(e.selected + 1);
  }

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={<Home movies={movies} page={page} changePage={changePage} />}
        />
        <Route path="/Movie/:movieId" element={<Movie />} />
      </Routes>
    </div>
  );
}

export default App;
