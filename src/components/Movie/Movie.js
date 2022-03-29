import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideo, getCredits } from "../Utils/Axios";
import { BiArrowBack } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { genres } from "../Utils/Genres";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function Movie(props) {
  const movie = useLocation();
  const {
    title,
    release_date,
    backdrop_path,
    poster_path,
    overview,
    vote_average,
    id,
    genre_ids,
  } = movie.state;

  const { addFavoriteMovie, removeFavoriteMovie, favorites } = props;

  const [videoId, setVideoId] = useState("");

  const [loading, setLoading] = useState(true);

  const [credits, setCredits] = useState([]);

  const [itsFavorite, setItsFavorite] = useState(false);

  console.log(itsFavorite);

  let navigate = useNavigate();

  useEffect(() => {
    getCredits(id).then((credit) => setCredits(credit));
  }, [id]);

  const Cast = credits
    .filter((credit) => credit.order <= 12)
    .map((actor) => actor.name)
    .join(", ");

  const movieGenres = genres
    .filter((genre) => genre_ids.some((genreId) => genreId === genre.id))
    .map((genre) => genre.name)
    .join(", ");

  function findVideoKey(videoId) {
    const videoKey = videoId.find(
      (movie) =>
        movie.name.includes("Trailer") ||
        movie.name.includes("Official Trailer") ||
        movie.name.includes("Main Trailer") ||
        movie.name.includes("Final Trailer")
    ).key;
    return videoKey;
  }

  function checkFovorite(movie) {
    if (favorites.some((favorite) => favorite.id === movie.id)) {
      setItsFavorite((prevState) => !prevState);
    }
  }

  useEffect(() => {
    setLoading(true);
    checkFovorite(movie.state);
    getVideo(id).then((videos) => {
      setVideoId(findVideoKey(videos));
      setTimeout(() => setLoading(false), 500);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MovieContainer
          backgroundUrl={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        >
          <MovieCard>
            <ContainerCol>
              <MovieTitle>{title}</MovieTitle>
              <ContainerRow>
                <CardImage
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                ></CardImage>
                <InfoContainer>
                  <MovieOverview>
                    <strong>Release Date: </strong>
                    {release_date}.
                  </MovieOverview>
                  <MovieOverview>
                    <strong>Genre: </strong>
                    {movieGenres}.
                  </MovieOverview>
                  <MovieOverview>
                    <strong>Cast: </strong>
                    {Cast}.
                  </MovieOverview>
                  <MovieOverview>
                    <strong>Synopsis: </strong>
                    {overview}
                  </MovieOverview>
                  <MovieOverview>
                    <strong>Average Raiting: </strong>
                    {vote_average} / 10.
                  </MovieOverview>
                </InfoContainer>
              </ContainerRow>
              <ButtonsContainer>
                <Button onClick={() => navigate(-1)}>
                  <BiArrowBack style={{ verticalAlign: "middle" }} /> Back
                </Button>
                {itsFavorite ? (
                  <Button
                    onClick={() => {
                      removeFavoriteMovie(movie.state);
                      setItsFavorite((prevState) => !prevState);
                    }}
                  >
                    Unstar{" "}
                    <AiOutlineStar
                      color="white"
                      size={20}
                      style={{ verticalAlign: "middle" }}
                    />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      addFavoriteMovie(movie.state);
                      setItsFavorite((prevState) => !prevState);
                    }}
                  >
                    Star{" "}
                    <AiFillStar
                      color="white"
                      size={20}
                      style={{ verticalAlign: "middle" }}
                    />
                  </Button>
                )}
                {videoId && (
                  <Button>
                    <StyledA
                      href={`https://www.youtube.com/watch?v=${videoId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch Trailer{" "}
                      <AiFillYoutube
                        style={{ verticalAlign: "middle" }}
                        size={20}
                      />
                    </StyledA>
                  </Button>
                )}
              </ButtonsContainer>
            </ContainerCol>
          </MovieCard>
        </MovieContainer>
      )}
    </>
  );
}

export default Movie;

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

const MovieContainer = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  margin-top: 60px;
  display: flex;
  align-items: center;
  background-position: center;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.backgroundUrl});
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 1;
  animation-name: ${fadeIn};
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 2s;

  @media (max-width: 480px) {
    height: calc(100vh - 40px);
    margin-top: 40px;
  }
`;

const ContainerCol = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;

  @media (max-width: 480px) {
    font-size: 3rem;
    justify-content: center;
    margin: 10px;
    padding: 30px 5px;
  }
`;

const ContainerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    font-size: 3rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: transparent;
  backdrop-filter: blur(3px);

  @media (max-width: 480px) {
    height: calc(100vh - 40px);
    justify-content: flex-start;
  }
`;

const CardImage = styled.img`
  width: 200px;
  height: auto;
  padding: 1rem;
  border-radius: 20px;
`;

const MovieTitle = styled.h1`
  text-align: center;
  font-size: 5rem;
  color: white;
  margin: 1rem;

  @media (max-width: 480px) {
    font-size: 3rem;
    margin: 1rem;
  }
`;

const MovieOverview = styled.p`
  margin: 0;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
  text-align: left;
`;

const StyledA = styled.a`
  text-decoration: none;
  color: white;
  text-align: center;
  line-height: 30px;
`;

const Button = styled.button`
  background-color: #242424;
  font-family: inherit;
  font-weight: 400;
  font-size: 1.5rem;
  color: white;
  margin-top: 2rem;
  padding: 10px 15px;
  border: 0;
  cursor: pointer;
  transition: linear 2ms;
  border-radius: 10px;
  text-align: center;
  vertical-align: middle;

  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 480px) {
    font-size: 1.3rem;

    padding: 5px 10px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 50px;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;
