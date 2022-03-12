import Cards from "../Cards/Cards";
import styled from "styled-components";
import { nanoid } from "nanoid";

function Home(props) {
  const { movies } = props;

  const Movies = movies.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  console.log(movies);

  return <CardsContainer>{Movies}</CardsContainer>;
}

export default Home;

const CardsContainer = styled.div`
  padding-top: 10rem;
  display: grid;
  grid-template-columns: repeat(4, 20rem);
  justify-content: center;
  margin: 0;
  background-color: #000000;
`;
