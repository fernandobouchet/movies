import { useEffect, useState } from "react";
import { searchMovie } from "../Utils/Axios";
import Cards from "../Cards/Cards";
import { nanoid } from "nanoid";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner/Spinner";
import GoToTopButton from "../Button/GoToTop/GoToTopButton";
import { BsTypeH1 } from "react-icons/bs";

function Search(props) {
  const { search } = props;

  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);

  const [prevSearch, setPrevSearch] = useState(search);

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (prevSearch !== search) {
      setMovies([]);
      setPage(1);
      setPrevSearch(search);
    }
    searchMovie(search, page).then((data) => {
      setMovies((prevMovies) => prevMovies.concat(data.results));
      setHasMore(data.page < data.total_pages);
    });
  }, [search, page]);

  function addPages() {
    setPage((prevPage) => prevPage + 1);
  }

  const Movies = movies.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  return (
    <>
      {movies.length > 1 ? (
        <InfiniteScroll
          dataLength={movies.length}
          hasMore={hasMore}
          next={addPages}
          loader={<Spinner />}
        >
          <CardsContainer>{Movies}</CardsContainer>
          <GoToTopButton />
        </InfiniteScroll>
      ) : (
        <MessageContainer>
          <StyledH2>No results found...</StyledH2>
        </MessageContainer>
      )}
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

const MessageContainer = styled.div`
  padding-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledH2 = styled.h2`
  font-size: 3rem;
  color: white;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
