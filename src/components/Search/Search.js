import { useEffect, useState } from "react";
import { searchMovie } from "../Utils/Axios";
import Cards from "../Cards/Cards";
import { nanoid } from "nanoid";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner/Spinner";

function Search(props) {
  const { search } = props;

  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);

  const [prevSearch, setPrevSearch] = useState("movie");

  useEffect(() => {
    if (prevSearch !== search) {
      setMovies([]);
      setPage(1);
      setPrevSearch(search);
    }
    (async () => {
      const movies = await searchMovie(search, page);
      setMovies((prevMovies) => prevMovies.concat(movies.results));
    })();
  }, [search, page, prevSearch]);

  function addPages() {
    setPage((prevPage) => prevPage + 1);
  }

  const Movies = movies.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        hasMore={true}
        next={addPages}
        loader={<Spinner />}
      >
        <CardsContainer>{Movies}</CardsContainer>
      </InfiniteScroll>
    </>
  );
}

export default Search;

const CardsContainer = styled.div`
  padding-top: 10rem;
  display: grid;
  grid-template-columns: repeat(4, 20rem);
  justify-content: center;
  margin: 0;
  background-color: #000000;

  @media (max-width: 480px) {
    padding-top: 5rem;
    grid-template-columns: repeat(2, 16rem);
  }
`;