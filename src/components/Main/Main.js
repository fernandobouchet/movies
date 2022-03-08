import { useEffect, useState } from "react";
import loadMovies from "../../Utils/Axios";
import Cards from "../Cards/Cards";
import styled from "styled-components";
import { nanoid } from "nanoid";

function Main() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const movies = await loadMovies();
      setMovies(movies);
    })();
  }, []);

  const Movies = movies.map((movie) => {
    return (
      <Cards key={nanoid()} title={movie.title} image={movie.poster_path} />
    );
  });

  return <CardsContainer>{Movies}</CardsContainer>;
}

export default Main;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;
`;