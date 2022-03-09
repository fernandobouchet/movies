import styled from "styled-components";
import { Link } from "react-router-dom";

function Cards(props) {
  const { movie } = props;
  return (
    <Link to={`/Movie/${movie.id}`} state={movie}>
      <CardContainer>
        <CardImage
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt=""
        />
        <CardTitle>{movie.title}</CardTitle>
      </CardContainer>
    </Link>
  );
}

export default Cards;

const CardContainer = styled.div`
  width: 10rem;
  height: 18rem;
  box-shadow: rgba(0, 0, 0, 0.55) 0px 5px 15px;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
`;

const CardImage = styled.img`
  width: 10rem;
  height: auto;
  border-radius: 0.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1rem;
`;
