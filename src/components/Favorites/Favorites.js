import Cards from "../Cards/Cards";
import { nanoid } from "nanoid";
import styled from "styled-components";
import GoToTopButton from "../Button/GoToTop/GoToTopButton";

function Favorites(props) {
  const { favs } = props;

  const Movies = favs.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  return (
    <>
      <CardsContainer>{Movies}</CardsContainer>
      <GoToTopButton />
    </>
  );
}

export default Favorites;

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
