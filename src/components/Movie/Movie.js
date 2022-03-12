import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideo } from "../Utils/Axios";

function Movie() {
  const movie = useLocation();
  const { title, backdrop_path, poster_path, overview, id } = movie.state;

  const [videoId, setVideoId] = useState("");

  const [video, setVideo] = useState(false);

  function showVideo() {
    setVideo((prevState) => !prevState);
  }

  useEffect(() => {
    (async () => {
      const videos = await getVideo(id);
      console.log(videos);
      const videoKey = videos.find(
        (movie) =>
          movie.name.includes("Trailer") ||
          movie.name === "Official Trailer" ||
          movie.name === "Main Trailer" ||
          movie.name === "Final Trailer"
      ).key;
      setVideoId(videoKey);
    })();
  }, []);

  return (
    <MovieContainer>
      <MovieTitle>{title}</MovieTitle>
      <MovieCard
        backgroundUrl={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
      >
        <MovieImgOver>
          <Container>
            <CardImage
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            ></CardImage>
          </Container>
          {video && (
            <Video
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></Video>
          )}
        </MovieImgOver>
        <MovieOverview>{overview}</MovieOverview>
        <TrailerButton onClick={showVideo}>
          {!video ? "Watch Trailer" : "Close Trailer"}
        </TrailerButton>
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

const Container = styled.div`
  display: flex;
  width: 60%;

  @media (max-width: 480px) {
    font-size: 3rem;
    width: 100%;
    justify-content: center;
  }
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  height: 450px;
  padding: 5rem 5rem;
  border-radius: 10px;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.backgroundUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 480px) {
    padding: 4rem 1rem;
  }
`;

const MovieImgOver = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CardImage = styled.img`
  width: 200px;
  height: auto;
  padding: 1rem;
  border-radius: 10px;
`;

const MovieTitle = styled.h1`
  font-size: 5rem;
  color: white;
  margin: 1rem;

  @media (max-width: 480px) {
    font-size: 2rem;
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
  margin-top: auto;
`;

const Video = styled.iframe`
  width: 1000px;
  height: 440px;
  position: absolute;
  padding: 2rem;
  border: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 480px) {
    width: 90%;
    height: 65%;
    allowfullscreen: true;
  }
`;

const TrailerButton = styled.button`
  background-color: #242424;
  font-family: inherit;
  font-weight: 400;
  font-size: 1.5rem;
  color: white;
  margin-top: 3rem;
  padding: 1rem;
  border: 0;
  cursor: pointer;
  transition: linear 2ms;

  &:hover {
    transform: scale(1.1);
  }
`;
