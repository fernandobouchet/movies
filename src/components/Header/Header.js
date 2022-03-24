import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { goToTop } from "../Utils/Functions";

function Header(props) {
  const { SearchMovie } = props;

  let navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    goToTop();
    SearchMovie(e.target[0].value);
    navigate(`/Search/${e.target[0].value}`);
    e.target[0].value = "";
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
        }}
      >
        <StyledInput type="search" name="" id="" placeholder="Search Movie" />
        <SearchButton type="submit">
          <BsSearch />
        </SearchButton>
      </form>
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

  background-color: black;
  width: 100%;
  top: 0;
  height: 60px;
  text-align: initial;

  @media (max-width: 480px) {
    height: 4rem;
    justify-content: space-between;
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
    font-size: 2.5rem;
    padding: 0.5rem;
    padding-left: 1rem;
  }
`;

const StyledSpan = styled.span`
  color: red;
  font-size: 4rem;

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const StyledInput = styled.input`
  border-style: solid;
  background-color: inherit;
  height: 25px;
  border-radius: 10px;
  color: white;
  border-width: 0.1px;
  border-style: solid;

  &:focus {
    outline-color: #242424;
  }

  @media (max-width: 480px) {
    height: 20px;
    font-size: 1.2rem;
    width: 110px;
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

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
