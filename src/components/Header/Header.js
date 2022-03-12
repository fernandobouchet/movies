import styled from "styled-components";
import { Link } from "react-router-dom";

function Header() {
  return (
    <StyledHeader>
      <Title>
        <StyledLink to={"/"}>Movies + </StyledLink>
      </Title>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  overflow: hidden;

  background-color: #242424;
  width: 100%;
  top: 0;
  height: 6rem;
  text-align: initial;
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
`;
