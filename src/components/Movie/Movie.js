import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideo } from "../Utils/Axios";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

function Movie() {
  const movie = useLocation();
  const { title, backdrop_path, poster_path, overview, id } = movie.state;

  const [videoId, setVideoId] = useState("");

  const [showVideo, setShowVideo] = useState(false);

  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  function setVideo() {
    setShowVideo((prevState) => !prevState);
  }

  function findVideoKey(videoId) {
    const videoKey = videoId.find(
      (movie) =>
        movie.name.includes("Trailer") ||
        movie.name === "Official Trailer" ||
        movie.name === "Main Trailer" ||
        movie.name === "Final Trailer"
    ).key;
    return videoKey;
  }

  useEffect(() => {
    setLoading(true);
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
            <Card>
              <MovieTitle>{title}</MovieTitle>
              <Container>
                <CardImage
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                ></CardImage>
                <MovieOverview>{overview}</MovieOverview>
                {showVideo && (
                  <Video
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></Video>
                )}
              </Container>
              <ButtonsContainer>
                <Button onClick={() => navigate("/")}>
                  <BiArrowBack></BiArrowBack> Back
                </Button>
                <Button onClick={setVideo}>
                  {!showVideo ? "Watch Trailer" : "Close Trailer"}
                </Button>
              </ButtonsContainer>
            </Card>
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
  height: 100vh;
  display: flex;
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
`;

const Container = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin-top: 2rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    font-size: 3rem;
    width: 100%;
    margin-top: 0;
    justify-content: center;
    padding: 1rem;
  }
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin-top: 6rem;
  background-color: transparent;
  backdrop-filter: blur(3px);

  @media (max-width: 480px) {
    margin-top: 4rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 500px;
  margin-top: 2rem;

  @media (max-width: 480px) {
    text-align: center;
    width: 90%;
    margin-top: 1rem;
  }
`;

const CardImage = styled.img`
  width: 200px;
  height: auto;
  padding: 1rem;
  border-radius: 20px;
`;

const MovieTitle = styled.h1`
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
  text-align: center;
  margin-left: auto;
`;

const Video = styled.iframe`
  width: 55%;
  height: 400px;
  position: absolute;
  border-style: none;
  border-radius: 10px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 480px) {
    top: 44%;
    left: 50%;
    width: 95%;
    height: 70%;
  }
`;

const Button = styled.button`
  background-color: #242424;
  font-family: inherit;
  font-weight: 400;
  font-size: 1.5rem;
  color: white;
  margin-top: 5rem;
  padding: 1rem;
  border: 0;
  cursor: pointer;
  transition: linear 2ms;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    margin-top: 2rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
