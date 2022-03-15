import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const { ChangeType, SearchMovie } = props;

  let navigate = useNavigate();

  function handleChange(e) {
    ChangeType(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    SearchMovie(e.target[0].value);
  }

  return (
    <StyledHeader>
      <Title>
        <StyledLink to={"/"}>Movies +</StyledLink>
      </Title>
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
      <form
        action="submit"
        onSubmit={(e) => {
          handleSearch(e);
          navigate("/Search");
        }}
      >
        <StyledInput type="search" name="" id="" />
        <SearchButton type="submit">Search</SearchButton>
      </form>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 1;

  gap: 1rem;

  background-color: #242424;
  width: 100%;
  top: 0;
  height: 6rem;
  text-align: initial;

  @media (max-width: 480px) {
    height: 4rem;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  cursor: pointer;
  text-decoration: none;
`;

const Title = styled.h1`
  margin: 0;
  padding: 1rem;
  font-size: 4rem;

  @media (max-width: 480px) {
    font-size: 2rem;
    padding: 0.5rem;
  }
`;

const StyledSelect = styled.select`
  font-family: inherit;
  font-size: 1.5rem;
  width: 11rem;
  height: 3rem;
  background-color: black;
  color: white;
  border-style: none;
`;

const StyledOption = styled.option`
  border-style: none;
`;

const StyledInput = styled.input`
  border-style: none;

  @media (max-width: 480px) {
    width: 3rem;
  }
`;

const SearchButton = styled.button`
  background-color: black;
  font-family: inherit;
  font-size: 1.5rem;
  color: white;
  border-style: none;
  cursor: pointer;
  transition: linear 2ms;

  &:hover {
    transform: scale(1.1);
  }
`;
