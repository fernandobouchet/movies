import Cards from "../Cards/Cards";
import styled, { keyframes } from "styled-components";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { loadMovies } from "../Utils/Axios";
import Spinner from "../Spinner/Spinner";

function Home(props) {
  const { type } = props;

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadMovies(type).then((movies) => {
      setMovies(movies.results);
    });
    setTimeout(() => setLoading(false), 500);
  }, [type]);

  const Movies = movies.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <HomeContainer>
          <CardsContainer>{Movies}</CardsContainer>;
        </HomeContainer>
      )}
    </>
  );
}

export default Home;

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

const HomeContainer = styled.div`
  opacity: 1;
  animation-name: ${fadeIn};
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 2s;
`;

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
