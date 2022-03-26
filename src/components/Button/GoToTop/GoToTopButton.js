import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { goToTop } from "../../Utils/Functions";

function GoToTopButton() {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  });

  return (
    <ButtonContainer key={visible}>
      {visible && <ArrowButton color="white" size={50} onClick={goToTop} />}
    </ButtonContainer>
  );
}

export default GoToTopButton;

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

const ButtonContainer = styled.div`
  position: fixed;
  z-index: 1;
  top: 85%;
  right: 20%;
  opacity: 1;
  animation-name: ${fadeIn};
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-duration: 2s;

  @media (max-width: 480px) {
    right: 2%;
  }
`;

const ArrowButton = styled(BsArrowUpCircleFill)`
  cursor: pointer;
  transition: 0.1s linear;

  &:hover {
    transform: scale(1.1);
  }
`;
