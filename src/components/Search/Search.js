import { useEffect, useState } from "react";
import { searchMovie } from "../Utils/Axios";
import Cards from "../Cards/Cards";
import { nanoid } from "nanoid";
import styled from "styled-components";

function Search(props) {
  const { search } = props;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const movies = await searchMovie(search);
      setMovies(movies);
    })();
  }, [search]);

  const Movies = movies.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  return (
    <>
      <CardsContainer>{Movies}</CardsContainer>;
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
