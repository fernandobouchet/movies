import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
      <h1>Movies +</h1>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  background-color: white;
  width: 100%;
  top: 0;
  height: 5rem;
  text-align: center;
`;
