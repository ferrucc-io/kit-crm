import styled from 'styled-components';

const DefaultButton = styled.button`
  text-transform: uppercase;
  font-size: 12px;
  border-radius: 5px;
  user-select: none;
  align-items: center;
  font-weight: 200;
  width: 130px;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 40px;
  -webkit-appearance: none;
  border: solid 1px;
  :hover {
    color: ${props => (props.primary ? 'black' : 'white')};
    background: ${props => (props.primary ? 'white' : 'black')};
    border-color: 'black';
  }
`;

export default DefaultButton;
