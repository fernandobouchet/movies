import styled from "styled-components";
import { useLocation } from "react-router-dom";

function Movie() {
  const movie = useLocation();
  const { title, backdrop_path, poster_path, overview } = movie.state;

  return (
    <MovieContainer>
      <MovieTitle>{title}</MovieTitle>
      <MovieCard
        backgroundUrl={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
      >
        <MovieImgOver>
          <CardImage
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          ></CardImage>
          <MovieOverview>{overview}</MovieOverview>
        </MovieImgOver>
      </MovieCard>
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
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 60%;
  padding: 3rem 3rem;
  border-radius: 10px;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.backgroundUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const MovieImgOver = styled.div`
  display: flex;
`;

const CardImage = styled.img`
  width: 25rem;
  height: auto;
  border-radius: 10px;
`;

const MovieTitle = styled.h1`
  font-size: 5rem;
  color: white;
`;

const MovieOverview = styled.p`
  display: flex;
  align-items: flex-end;
  margin: 0;
  padding: 0 1rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
  justify-content: flex-end;
`;
