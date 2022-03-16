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

  const [pages, setPages] = useState(1);

  const [paginationPages, setPaginationPages] = useState(1);

  const [search, setSearch] = useState("movie");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadMovies(type, pages).then((movies) => {
      setMovies(movies.results);
      setPaginationPages(type === "popular" ? 500 : movies.total_pages);
    });
    setLoading(false);
  }, [type, pages]);

  function changeType(type) {
    setType(type);
    setPages(1);
  }

  function searchMovie(movie) {
    setSearch(movie);
  }

  function changePage(e) {
    setPages(e.selected + 1);
  }

  return (
    <div>
      <Header
        ChangeType={(type) => changeType(type)}
        SearchMovie={(movie) => searchMovie(movie)}
      ></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={movies}
              type={type}
              changePage={(e) => changePage(e)}
              PaginationPages={paginationPages}
              loading={loading}
            />
          }
        />
        <Route path="/Movie/:movieId" element={<Movie />} />
        <Route path="/Search" element={<Search search={search} />} />
      </Routes>
    </div>
  );
}

export default App;
