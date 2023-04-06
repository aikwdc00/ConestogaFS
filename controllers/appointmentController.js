const User = require('../models/user')
const Appointment = require('../models/appointment')
const { getMsg, setSingleMsg, msgObj, msgData } = require('../Util/message')
const { setDatesToString } = require('../Util/appointmentFn')

// get appointment page
exports.getAppointmentPage = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)

  Appointment
    .find()
    .then((appointment) => {

      const appointments = setDatesToString(appointment)

      res.render('admin/appointment', {
        pageTitle: 'Appointment',
        path: '/appointment',
        message,
        appointments,
      })
    })
    .catch(err => console.log(err))

}

// post appointment
exports.postAppointmentHandler = (req, res, next) => {
  const { date, time } = req.body

  if (!date) {
    setSingleMsg(req,
      msgObj(msgData.setMsgType(msgData.error), msgData.bookDateUndefined))
    return res.redirect('/appointment')
  }

  const makeAppointment = new Appointment({ ...req.body })
  makeAppointment.save()
    .then(result => {
      setSingleMsg(req,
        msgObj(msgData.setMsgType(msgData.success),
          msgData.bookingSuccess))
      return res.redirect('/appointment')
    })
    .catch((err) => console.log('post appointment err', err))

}

// get appointment page
exports.getAdminPage = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)

  Appointment
    .find()
    .populate('userId')
    .then((appointment) => {

      const appointments = setDatesToString(appointment)
      const filterData = appointment.filter(item => item?.userId)

      res.render('admin/Admin', {
        pageTitle: 'Admin',
        path: '/adminView',
        message,
        filterData,
        appointments
      })
    })
    .catch(err => console.log(err))

}