function disabledTime(appointments, time) {
  // avoid to duplicate choose the same time
  return appointments.some(item => (item.time == time)) ? 'disabled' : ''
}

function setDatesToString(appointment) {
  // set appointments array to json string
  return appointment.length && JSON.stringify(appointment[0]?.appointments)
}

module.exports = {
  disabledTime,
  setDatesToString,
}