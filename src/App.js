import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";
import Search from "./components/Search/Search";
import { loadMovies } from "./components/Utils/Axios";
import Favorites from "./components/Favorites/Favorites";

function App() {
  const [type, setType] = useState("popular");

  const [savedType, setSavedType] = useState("popular");

  const [search, setSearch] = useState("movie");

  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadMovies(type, page).then((movies) => {
      setMovies((prevMovies) => prevMovies.concat(movies.results));
      setHasMore(movies.page < movies.total_pages);
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

  function addFavoriteMovie(movie) {
    if (!favorites.some((favorite) => favorite.id === movie.id))
      setFavorites((prevMovies) => {
        return [...prevMovies, movie];
      });
  }

  function removeFavoriteMovie(movie) {
    setFavorites((prevMovies) => {
      return [...prevMovies.filter((favorite) => favorite.id !== movie.id)];
    });
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
              hasMore={hasMore}
            />
          }
        />
        <Route
          path="/Movie/:movieId"
          element={
            <Movie
              addFavoriteMovie={(movie) => addFavoriteMovie(movie)}
              removeFavoriteMovie={(movie) => removeFavoriteMovie(movie)}
              favorites={favorites}
            />
          }
        />
        <Route path="/Search/:movieName" element={<Search search={search} />} />
        <Route path="/Favorites" element={<Favorites favs={favorites} />} />
      </Routes>
    </div>
  );
}

export default App;
