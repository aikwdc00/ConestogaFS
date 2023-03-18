
// create a array of time
function getTimeStops(start, end) {
  const startTime = moment(start, 'HH:mm');
  const endTime = moment(end, 'HH:mm');

  if (endTime.isBefore(startTime)) {
    endTime.add(1, 'day');
  }

  const timeStops = [];

  while (startTime <= endTime) {
    timeStops.push(new moment(startTime).format('HH:mm'));
    startTime.add(30, 'minutes');
  }
  return timeStops;
}
// format time
const timeFormat = (time) => {
  const getHour = time.split(':')
  let newTime = ''

  if (+getHour[0] > 11) {
    switch (+getHour[0]) {
      case 12:
        newTime = (+getHour[0]) + `:${getHour[1]} PM`
        break;
      default:
        newTime = (+getHour[0] - 12) + `:${getHour[1]} PM`
        break
    }
  } else {
    newTime = getHour[0] + `:${getHour[1]} AM`
  }

  return newTime
}


$(document).ready(function () {

  const timeStops = getTimeStops('09:00', '14:00');

  if (Array.isArray(timeStops) && timeStops.length) {
    let time = ''
    timeStops.map(item => time += `<option value='${timeFormat(item)}'>${timeFormat(item)}</option>`)

    $('#appointSlots').append(time)
  }


});