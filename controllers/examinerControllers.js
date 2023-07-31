
const User = require('../models/user')
const Appointment = require('../models/appointment')
const { getMsg, setSingleMsg, msgObj, msgData, multipleMsg } = require('../Util/message')
const { setDatesToString } = require('../Util/appointmentFn')

// get appointment page
exports.getExamPage = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)

  Appointment
    .find()
    .populate('userId')
    .then((appsResult) => {

      const filterData = appsResult.filter(item => item?.userId)
      const filterDataString = setDatesToString(appsResult)

      res.render('examiner/examinerPage', {
        pageTitle: 'ExamPage',
        path: '/examinerPage',
        message,
        filterDataString,
        appointmentsData: appsResult,
      })
    })
    .catch(err => console.log('err', err))
}

exports.getDriverInfoDetail = (req, res, next) => {
  const { id } = req.params
  const message = getMsg(req, msgData.nowMsgType)

  User
    .findById(id)
    .then((foundUser) => {
      res.render('examiner/viewDriverInfo', {
        pageTitle: 'DriverInfo',
        path: '/viewDriverInfo',
        message,
        user: foundUser
      })
    })
    .catch(err => console.log('err', err))

}

exports.postExaminerEvaluate = (req, res, next) => {

  const { userId, examResult, examComment } = req.body

  if (!examResult || !examComment) {
    setSingleMsg(req,
      msgObj(msgData.setMsgType(msgData.error),
        msgData.driverDetailError))

    return res.redirect(`/examiner/driverDetail/${userId}`)
  }

  User.findById(userId)
    .then((user) => {
      return user.storeData(req.body, req, res, true)
    })
    .then(result => {
      res.redirect('AccessExaminerPage')

    })
    .catch(err => {
      multipleMsg(req, res, err)
    })
}