import styled from "styled-components";
import { useLocation } from "react-router-dom";

function Movie() {
  const movie = useLocation();
  const { title, backdrop_path, poster_path, overview } = movie.state;
  console.log(movie.state);

  return (
    <MovieContainer
      backgroundUrl={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
    >
      <MovieTitle>{title}</MovieTitle>
      <CardImage
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
      ></CardImage>
      <MovieOverview>{overview}</MovieOverview>
    </MovieContainer>
  );
}

export default Movie;

const MovieContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-image: url(${(props) => props.backgroundUrl});
  background-size: cover;
  background-repeat: no-repeat;
`;

const CardImage = styled.img`
  width: 25rem;
  height: auto;
  border-radius: 0.5rem;
`;

const MovieTitle = styled.h1`
  font-size: 5rem;
  color: white;
`;

const MovieOverview = styled.p`
  font-size: 2rem;
  color: white;
`;
