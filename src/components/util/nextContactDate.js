import moment from 'moment';

export default function nextContactDate(priority) {
  if (priority === 'A') {
    return moment()
      .add(14, 'days')
      .calendar();
  }
  if (priority === 'B') {
    return moment()
      .add(30, 'days')
      .calendar();
  }
  if (priority === 'C') {
    return moment()
      .add(90, 'days')
      .calendar();
  }
  if (priority === 'D') {
    return moment()
      .add(365, 'days')
      .calendar();
  }
}
