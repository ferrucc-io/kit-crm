import styled from 'styled-components';

const PriorityLabel = styled.span`
  background: ${props => {
    if (props.priority === 'A') {
      return 'blue';
    }
    if (props.priority === 'B') {
      return 'red';
    }
    if (props.priority === 'C') {
      return 'orange';
    }
    if (props.priority === 'D') {
      return 'green';
    }

    return 'red';
  }}
  color: white;
  position: relative;
  padding: ${props => (props.small ? '0 5px;' : '0px 10px;')};
  span {
    font-size: 13px;
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 2px 0;
    position: absolute;
    z-index: 1;
    bottom: 120%;
    left: 50%;
    margin-left: -60px;
  }

  span::after{
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  :hover span {
      visibility: ${props => (props.small ? 'hidden' : 'visible')};
  }

  

`;

export default PriorityLabel;
