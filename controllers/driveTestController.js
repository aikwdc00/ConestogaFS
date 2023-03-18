const User = require('../models/user')
const { getMsg, setSingleMsg, msgObj, msgData } = require('../Util/message')

// Dashboard
exports.getDashboard = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)
  res.render('driveTest/dashboard', { pageTitle: 'Dashboard', path: '/dashboard', message })
}
