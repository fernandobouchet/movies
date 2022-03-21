import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { goToTop } from "../Utils/Functions";

function Header(props) {
  const { ChangeType, SearchMovie } = props;

  let navigate = useNavigate();

  function handleChange(e) {
    goToTop();
    ChangeType(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    goToTop();
    SearchMovie(e.target[0].value);
  }

  return (
    <StyledHeader>
      <Title>
        <StyledLink to={"/"}>
          Movies <StyledSpan>+</StyledSpan>
        </StyledLink>
      </Title>
      <form
        action="submit"
        onSubmit={(e) => {
          handleSearch(e);
          navigate("/Search");
        }}
      >
        <StyledInput type="search" name="" id="" placeholder="Search Movie" />
        <SearchButton type="submit">
          <BsSearch />
        </SearchButton>
      </form>
      <StyledRow>
        {" "}
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
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;

  gap: 1rem;

  background-color: black;
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
  height: 2rem;
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

const StyledH2 = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
`;

const StyledSpan = styled.span`
  color: red;
  font-size: 4rem;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StyledSelect = styled.select`
  font-family: inherit;
  font-size: 1.5rem;
  width: 11rem;
  background-color: black;
  color: white;
  border-style: none;

  &::content {
    border-style: none;
    background-color: red;
  }
`;

const StyledOption = styled.option`
  border-style: none;
`;

const StyledInput = styled.input`
  border-style: solid;
  background-color: inherit;
  height: 2.5rem;
  border-radius: 10px;
  color: white;
  @media (max-width: 480px) {
    width: 3rem;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  font-family: inherit;
  font-size: 2rem;
  color: white;
  border-style: none;
  cursor: pointer;
  transition: linear 2ms;
  vertical-align: middle;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
`;
