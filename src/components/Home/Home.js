import { useEffect, useState } from "react";
import loadMovies from "../../Utils/Axios";
import Cards from "../Cards/Cards";
import styled from "styled-components";
import { nanoid } from "nanoid";

function Home() {
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

export default Home;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 15rem);
  justify-content: center;
  margin: 5rem 1rem;
`;
