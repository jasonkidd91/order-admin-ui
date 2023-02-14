import moment from 'moment';

function currentDate() {
  return moment();
}

function parseDate(input: Date | string, format?: string) {
  return moment(input, format);
}

function formatDate(inputDate: moment.Moment | Date, format?: string) {
  let date = inputDate;
  if (inputDate instanceof Date) {
    date = moment(inputDate);
  }
  return (date as moment.Moment).format(format);
}

export { currentDate, parseDate, formatDate };
