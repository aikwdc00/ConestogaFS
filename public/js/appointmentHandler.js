// appointment page
const appointDate = $('#appointDate')
const appointTimeSlots = $('#appointSlots')

const appointmentHandler = {
  chooseDate: '',
  appointInitialHandler() {
    // control initial render or re-render after change event 
    const appointNode = $('#appointSlots')

    this.renderTimeSlots(appointNode)
    $('.appointmentBtn').removeClass('btn-primary')
    $('.appointmentBtn').addClass('btn-secondary')

    appointDate.change(function (e) {
      appointmentHandler.chooseDate = e.target.value
      appointmentHandler.renderTimeSlots(appointNode)
      $('.appointmentBtn').removeClass('btn-secondary')
      $('.appointmentBtn').addClass('btn-primary')
    })
  },
  disabledTime(time) { // if the same date and time, be disable
    if (!addedAppointment.length) return ''
    // console.log('item.date', item.date)
    console.log('this.chooseDate', this.chooseDate)
    // console.log('item.time', item.time)
    console.log('time', time)
    return addedAppointment.some(item => (item.date == this.chooseDate) && (item.time == time)) ? 'disabled' : ''
  },
  renderTimeSlots(inertNode) {
    const timeStops = getTimeStops('09:00', '14:00');
    if (Array.isArray(timeStops) && timeStops.length) {
      let time = ''
      timeStops.map(item => time += `<option value='${timeFormat(item)}' ${this.disabledTime(timeFormat(item))} >${timeFormat(item)}</option>`)

      // if already choose date, re-render time slots
      if (appointmentHandler.chooseDate) {
        inertNode.children().detach()
      }

      inertNode.append(time)
    }
  }
}
