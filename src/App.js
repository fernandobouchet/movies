import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";
import Search from "./components/Search/Search";

function App() {
  const [type, setType] = useState("popular");

  const [pages, setPages] = useState(1);

  const [search, setSearch] = useState("movie");

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
            <Home type={type} pages={pages} changePage={(e) => changePage(e)} />
          }
        />
        <Route path="/Movie/:movieId" element={<Movie />} />
        <Route path="/Search" element={<Search search={search} />} />
      </Routes>
    </div>
  );
}

export default App;
