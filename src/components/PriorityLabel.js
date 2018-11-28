import React from 'react';
import PriorityLabelStyle from './styles/PriorityLabelStyle';

const priorityLabel = {
  A: '2 weeks',
  B: 'month',
  C: '3 months',
  D: 'year',
};
let text = '';
function PriorityLabel(props) {
  if (props.priority === 'A') {
    text = `Contact every ${priorityLabel.A}`;
  }
  if (props.priority === 'B') {
    text = `Contact every ${priorityLabel.B}`;
  }
  if (props.priority === 'C') {
    text = `Contact every ${priorityLabel.C}`;
  }

  if (props.priority === 'D') {
    text = `Contact every ${priorityLabel.D}`;
  }
  return (
    <PriorityLabelStyle priority={props.priority} small={props.small}>
      {props.priority}
      <span>{text}</span>
    </PriorityLabelStyle>
  );
}

export default PriorityLabel;
