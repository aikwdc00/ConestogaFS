const User = require('../models/user')
const Appointment = require('../models/appointment')
const { getMsg, setSingleMsg, msgObj, msgData } = require('../Util/message')
const { disabledTime, setDatesToString } = require('../Util/appointmentFn')

// get appointment page
exports.getAppointmentPage = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)

  Appointment
    .find()
    .then((appointment) => {

      const appointments = setDatesToString(appointment)

      res.render('driveTest/appointment', {
        pageTitle: 'Appointment',
        path: '/appointment',
        message,
        appointments,
        disabledTime,
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
