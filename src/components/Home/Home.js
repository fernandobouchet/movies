import Cards from "../Cards/Cards";
import styled, { keyframes } from "styled-components";
import { nanoid } from "nanoid";
import Spinner from "../Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { goToTop } from "../Utils/Functions";

function Home(props) {
  const { movies, addPages, ChangeType } = props;

  let navigate = useNavigate();

  function handleChange(e) {
    goToTop();
    ChangeType(e.target.value);
  }

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
          <StyledRow>
            <StyledH2>Order By: </StyledH2>
            <StyledSelect
              name="movies"
              id=""
              onChange={(e) => {
                handleChange(e);
                navigate("/");
              }}
            >
              <StyledOption value="popular">Popular</StyledOption>
              <StyledOption value="upcoming">Upcoming</StyledOption>
              <StyledOption value="top_rated">Top Rated</StyledOption>
              <StyledOption value="now_playing">Now Playing</StyledOption>
            </StyledSelect>
          </StyledRow>
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
  margin-top: 60px;
  opacity: 1;
  animation-name: ${fadeIn};
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 2s;

  @media (max-width: 480px) {
    margin-top: 40px;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 20rem);
  justify-content: center;
  margin: 0;
  background-color: #000000;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 16rem);
  }
`;

const StyledOption = styled.option`
  border-style: none;
`;

const StyledH2 = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const StyledSelect = styled.select`
  font-family: inherit;
  font-size: 1.5rem;
  width: 110px;
  background-color: black;
  color: white;
  border-style: none;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;
