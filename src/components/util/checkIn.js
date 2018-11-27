import moment from 'moment';

export default function checkIn(date, priority) {
  if (priority === 'A') {
    return moment(date, 'MM/DD/YYYY')
      .add(14, 'days')
      .calendar();
  }
  if (priority === 'B') {
    return moment(date, 'MM/DD/YYYY')
      .add(30, 'days')
      .calendar();
  }
  if (priority === 'C') {
    return moment(date, 'MM/DD/YYYY')
      .add(90, 'days')
      .calendar();
  }
  if (priority === 'D') {
    return moment(date, 'MM/DD/YYYY')
      .add(365, 'days')
      .calendar();
  }
}
