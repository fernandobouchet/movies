import styled from "styled-components";

function Cards(props) {
  const { title, image } = props;
  return (
    <CardContainer>
      <CardImage src={`https://image.tmdb.org/t/p/w500/${image}`} alt="" />
      <CardTitle>{title}</CardTitle>
    </CardContainer>
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
