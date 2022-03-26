import Cards from "../Cards/Cards";
import styled, { keyframes } from "styled-components";
import { nanoid } from "nanoid";
import Spinner from "../Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { goToTop } from "../Utils/Functions";
import Select from "react-select";
import GoToTopButton from "../Button/GoToTop/GoToTopButton";

function Home(props) {
  const { movies, addPages, ChangeType, hasMore } = props;

  let navigate = useNavigate();

  function handleChange(e) {
    goToTop();
    ChangeType(e.value);
  }

  const options = [
    { value: "popular", label: "Popular" },
    { value: "upcoming", label: "Upcoming" },
    { value: "top_rated", label: "Top Rated" },
    { value: "now_playing", label: "Now Playing" },
  ];

  const Movies = movies.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        hasMore={hasMore}
        next={addPages}
        loader={<Spinner />}
      >
        <HomeContainer>
          <StyledRow>
            <StyledH2>Order By: </StyledH2>
            <StyledSelect
              defaultValue={options[0]}
              options={options}
              styles={{
                control: (styles) => ({
                  ...styles,
                  cursor: "pointer",
                  background: "black",
                  color: "white",
                  border: 0,
                }),
                option: (styles) => ({
                  ...styles,
                  cursor: "pointer",
                }),
                menu: (styles) => ({
                  ...styles,
                  background: "black",
                  color: "white",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  border: 0,
                  color: "white",
                }),
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#242424",
                  primary: "black",
                },
              })}
              onChange={(e) => {
                handleChange(e);
                navigate("/");
              }}
            />
          </StyledRow>
          <GoToTopButton></GoToTopButton>
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

const StyledH2 = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
  line-height: 2.5;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    line-height: 3;
  }
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.1rem;
  }
`;

const StyledSelect = styled(Select)`
  font-size: 1.5rem;
  width: 140px;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;
