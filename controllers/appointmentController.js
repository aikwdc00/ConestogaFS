const User = require('../models/user')
const { getMsg, setSingleMsg, msgObj, msgData } = require('../Util/message')

// get appointment page
exports.getAppointmentPage = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)
  res.render('driveTest/appointment', { pageTitle: 'Appointment', path: '/appointment', message })
}
