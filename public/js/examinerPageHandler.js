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
          <div class="d-flex flex-row w-25 justify-content-around">
            <p>${item.date}</p>
            <p>${item.time}</p>
          </div>
           <div class="d-flex flex-row w-25 justify-content-around my-1">
            <p>${item?.userId?.firstName || ''}</p>
            <p>${item?.userId?.lastName || ''}</p>
            <p>${item?.userId?.TestType || ''}</p>
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
