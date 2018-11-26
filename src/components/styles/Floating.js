import styled, { keyframes } from 'styled-components';

const floating = keyframes`
0% {
    transform: translate(0,0);
}
65% {
    transform: translate(0,2px);
}

100% {
    transform: translate(0,-0);
}
`;

const Floating = styled.img`
  animation-name: ${floating};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

export default Floating;
