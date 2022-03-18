import Cards from "../Cards/Cards";
import styled, { keyframes } from "styled-components";
import { nanoid } from "nanoid";
import Spinner from "../Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

function Home(props) {
  const { movies, addPages } = props;

  const Movies = movies.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        hasMore={true}
        next={addPages}
        loader={<Spinner />}
      >
        <HomeContainer>
          <CardsContainer>{Movies}</CardsContainer>;
        </HomeContainer>
      </InfiniteScroll>
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
