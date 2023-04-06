const getAppointments = $('.appointments').val()
const addedAppointment = getAppointments && JSON.parse(getAppointments) || []
addedAppointment.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())

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
  // appointment
  appointmentHandler.appointInitialHandler()
  // g2 page
  g2Handler.setDatePickerDefault();
  // examiner page
  examinerPageHandler.examinerFilterData();
  examinerPageHandler.examinerInitialRender()
});