import styled from "styled-components";
import { Link } from "react-router-dom";

function Cards(props) {
  const { movie } = props;
  return (
    <CardContainer>
      <StyledLink to={`/Movie/${movie.id}`} state={movie}>
        <CardImage
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt=""
        />
        <CardTitle>{movie.title}</CardTitle>
      </StyledLink>
    </CardContainer>
  );
}

export default Cards;

const CardContainer = styled.div`
  margin: 1rem;
  text-align: center;
  cursor: pointer;
  transition: 0.1s linear;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardImage = styled.img`
  width: 18rem;
  height: auto;
  border-radius: 10px;
`;

const CardTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
