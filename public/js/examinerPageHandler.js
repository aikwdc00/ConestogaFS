// appointment page
const filterTestType = $('#filterTestType') // filter test type
const renderAppointData = $('#renderAppointData')
const getAppointmentsList = $('#filterAppointList').val()
const appointList = getAppointmentsList && JSON.parse(getAppointmentsList) || [] // data


const examinerPageHandler = {
  filterType: '',
  renderList(item) {
    return `<a  
          href=${item?.userId ? `/examiner/driverDetail/${item?.userId._id}` : '#'}
          class="list-group-item list-group-item-action justify-content-center" 
          >
          <div class="d-flex flex-row w-100 justify-content-around">
           <div>
            <label for=${item?.userId}_date>Appointment Date</label>
            <input id=${item?.userId}_date value=${item.date} disabled>
           </div>
           <div>
            <label for=${item?.userId}_time>Appointment Time</label>
            <input id=${item?.userId}_time value=${item.time} disabled>
           </div>
          </div>

          <div class="d-flex flex-row w-100 justify-content-around my-2 px-4">
            ${item?.userId?.firstName ? `
                <div class="d-flex flex-column">
                  <label for=${item?.userId}_firstName>First Name</label>
                  <input id=${item?.userId}_firstName value=${item?.userId?.firstName} disabled>
                </div>
            `: ''}

            ${item?.userId?.lastName ? `
                <div class="d-flex flex-column">
                  <label for=${item?.userId}_lastName>Last Name</label>
                  <input id=${item?.userId}_lastName value=${item?.userId?.lastName} disabled>
                </div>
            `: ''}

            ${item?.userId?.TestType ? `
                <div class="d-flex flex-column">
                  <label for=${item?.userId}_TestType>Test Type</label>
                  <input id=${item?.userId}_TestType value=${item?.userId?.TestType} disabled>
                </div>
            `: ''}

          </div>
        </a>
          `
  },
  insertList(data) {
    renderAppointData.children().detach()
    renderAppointData.append(data)
  },
  examinerInitialRender() {

    let data = ''
    appointList.map(item => {
      data += this.renderList(item)
    })

    this.insertList(data)
  },
  examinerFilterData() {

    let data = ''
    filterTestType.change(function (e) {
      examinerPageHandler.filterType = e.target.value
      const filterData = appointList.filter(item => item?.userId?.TestType == examinerPageHandler.filterType)

      if (filterData.length) {
        filterData.map(item => {

          data += examinerPageHandler.renderList(item)
        })

        examinerPageHandler.insertList(data)
        data = ''
        return
      } else if (examinerPageHandler.filterType == 'All') {
        examinerPageHandler.examinerInitialRender()
        return
      } else {
        examinerPageHandler.insertList(data)
      }

    })

  },

}
