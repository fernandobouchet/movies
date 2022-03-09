import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();

  return (
    <StyledHeader>
      <h1 onClick={() => navigate("/")}>Movies +</h1>
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
  cursor: pointer;
`;
