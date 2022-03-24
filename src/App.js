import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";
import Search from "./components/Search/Search";
import { loadMovies } from "./components/Utils/Axios";

function App() {
  const [type, setType] = useState("popular");

  const [savedType, setSavedType] = useState("popular");

  const [search, setSearch] = useState("movie");

  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMovies(type, page).then((movies) => {
      setMovies((prevMovies) => prevMovies.concat(movies.results));
    });
  }, [type, page]);

  function changeType(type) {
    if (savedType !== type) {
      setMovies([]);
      setPage(1);
      setType(type);
      setSavedType(type);
    }
  }

  function searchMovie(movie) {
    setSearch(movie);
  }

  function addPage() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <div>
      <Header SearchMovie={(movie) => searchMovie(movie)}></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={movies}
              addPages={() => addPage()}
              ChangeType={(type) => changeType(type)}
            />
          }
        />
        <Route
          path="/Movie/:movieId"
          element={<Movie ChangeType={(type) => changeType(type)} />}
        />
        <Route path="/Search/:movieName" element={<Search search={search} />} />
      </Routes>
    </div>
  );
}

export default App;
