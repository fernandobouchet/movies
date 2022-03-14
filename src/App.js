import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadMovies } from "./components/Utils/Axios";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";
import Search from "./components/Search/Search";

function App() {
  const [movies, setMovies] = useState([]);

  const [type, setType] = useState("popular");

  const [search, setSearch] = useState("movie");

  useEffect(() => {
    (async () => {
      const movies = await loadMovies(type);
      setMovies(movies);
    })();
  }, [type]);

  function changeType(type) {
    setType(type);
  }

  function searchMovie(movie) {
    setSearch(movie);
  }

  return (
    <div>
      <Header
        ChangeType={(type) => changeType(type)}
        SearchMovie={(movie) => searchMovie(movie)}
      ></Header>
      <Routes>
        <Route path="/" element={<Home movies={movies} type={type} />} />
        <Route path="/Movie/:movieId" element={<Movie />} />
        <Route path="/Search" element={<Search search={search} />} />
      </Routes>
    </div>
  );
}

export default App;
