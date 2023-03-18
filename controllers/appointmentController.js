const Appointment = require('../models/appointment')
const { getMsg, setSingleMsg, msgObj, msgData } = require('../Util/message')

// get appointment page
exports.getAppointmentPage = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)
  res.render('driveTest/appointment', { pageTitle: 'Appointment', path: '/appointment', message })
}

// post appointment
exports.postAppointmentHandler = (req, res, next) => {

  console.log('body', req.body)

  Appointment.find()
    .then((data) => {

      if (data.length) {
        data[0].appointments = [
          ...data[0].appointments,
          req.body,
        ]

        return data[0].save()
      }
      else {
        const appointments = [{ ...req.body }]
        const makeAppointment = new Appointment({
          appointments,
        })

        makeAppointment.save()
      }

    })
    .then(result => {
      setSingleMsg(req,
        msgObj(msgData.setMsgType(msgData.success),
          msgData.bookingSuccess))
      res.redirect('/')
    })
    .catch((err) => console.log('post appointment err', err))

}
