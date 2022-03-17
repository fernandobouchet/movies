import { ImSpinner2 } from "react-icons/im";
import styled, { keyframes } from "styled-components";

function Spinner() {
  return (
    <SpinnerContainer>
      <StyledSpinner size={100} color={"white"} />
    </SpinnerContainer>
  );
}

export default Spinner;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25%;
  height: 100vh;
`;

const rotate = keyframes`
to {
    transform: rotate(360deg)
}
`;

const StyledSpinner = styled(ImSpinner2)`
  animation: ${rotate} 1s linear infinite;
`;
