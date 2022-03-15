import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideo } from "../Utils/Axios";

function Movie() {
  const movie = useLocation();
  const { title, backdrop_path, poster_path, overview, id } = movie.state;

  const [videoId, setVideoId] = useState("");

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
  }, [id]);

  return (
    <MovieContainer
      backgroundUrl={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
    >
      <MovieCard>
        <Card>
          <MovieTitle>{title}</MovieTitle>
          <MovieImgOver>
            <Container>
              <CardImage
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              ></CardImage>
            </Container>
            {videoId && (
              <Video
                src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></Video>
            )}
          </MovieImgOver>
          <MovieOverview>{overview}</MovieOverview>
        </Card>
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
  background-position: center;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.backgroundUrl});
  background-size: cover;
  background-repeat: no-repeat;
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
  width: 60%;
  height: 500px;
  margin-top: 6rem;

  @media (max-width: 480px) {
    text-align: center;
    width: 90%;
    margin-top: 1rem;
  }
`;

const MovieImgOver = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
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
  margin-top: auto;
`;

const Video = styled.iframe`
  width: 720px;
  height: 300px;
  border-style: none;
  border-radius: 10px;

  @media (max-width: 480px) {
    width: 90%;
    height: 65%;
  }
`;
