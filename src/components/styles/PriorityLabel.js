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
  padding: ${props => (props.small ? '0 5px;' : '0px 10px;')};
`;

export default PriorityLabel;
