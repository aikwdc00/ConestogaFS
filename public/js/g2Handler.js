// g2 page
const g2Handler = {
  chooseDate: '',
  setDatePickerDefault() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    const today = year + "-" + month + "-" + day

    this.chooseDate = today
    $('#userAppointDate').val(today)

    this.appointInitialHandler()
  },
  appointInitialHandler() {
    const appointNode = $('#userAppointSlots')

    this.renderG2TimeSlots(appointNode)

    $('#userAppointDate').change(function (e) {
      g2Handler.chooseDate = e.target.value

      g2Handler.renderG2TimeSlots(appointNode)

    })
  },
  renderG2TimeSlots(inertNode) {

    if (Array.isArray(addedAppointment) && addedAppointment.length) {
      let time = ''

      addedAppointment.map(item => {
        if (!item.isTimeSlotAvailable) return
        if (item.date == this.chooseDate) {
          time += `
          <option value='${item.time}'>${item.time}</option>
          `
        }
      })

      // if already choose date, re-render time slots
      if (this.chooseDate) {
        inertNode.children().detach()
      }

      $('#userAppointSlots').append(time)
    }
  }
}