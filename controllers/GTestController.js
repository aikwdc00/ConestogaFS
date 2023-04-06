const User = require('../models/user')
const Appointment = require('../models/appointment')
const { getMsg, setSingleMsg, msgObj, msgData } = require('../Util/message')
const { setDatesToString } = require('../Util/appointmentFn')

// G Test
exports.getGTEST = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)
  const user = req.user
  const { firstName, lastName, LicenseNo } = user

  if (firstName == 'default' || lastName == 'default' || LicenseNo == 'default') {
    setSingleMsg(req,
      msgObj(msgData.setMsgType(msgData.error),
        msgData.incompleteData))
    return res.redirect('/G2_TEST')
  }

  Appointment
    .find()
    .populate('userId')
    .then((appsResult) => {

      const appointments = setDatesToString(appsResult)
      const filterData = appsResult.filter(item => item?.userId?._id.valueOf() == user._id)[0]

      res.render('driveTest/G', {
        pageTitle: 'G_TEST',
        path: '/G_TEST',
        user: null,
        message,
        user,
        appointments,
        filterData,
      })
    })
    .catch(err => console.log('err', err))

}

exports.postGTestData = (req, res, next) => {

  const LicenseNo = req.body.LicenseNumber
  User.findOne({ LicenseNo })
    .then(user => {

      if (!user) {
        // req.flash('error', [{ msg: 'No User Found' }]);
        setSingleMsg(req, msgObj('error', 'No User Found'))
        return res.redirect('/G2_TEST');
      }

      res.redirect(`/G_TEST/${user._id}`)
    })
    .catch((err) => {
      console.log('postGTestData', err)
    })

}

exports.getUserIdGTEST = (req, res, next) => {

  const message = getMsg(req, msgData.nowMsgType)

  const id = req.params.id
  User.findById({ _id: id })
    .then(user => {
      res.render('driveTest/G', {
        pageTitle: 'G_TEST',
        path: '/G_TEST',
        user,
        message
      })
    })
    .catch(err => console.log('getUserIdGTEST_err', err))
}

exports.postEditGTestData = (req, res, next) => {
  const reqBody = req.body
  const { LicenseNumber, userId, time } = reqBody

  User.findById(reqBody.userId)
    .then((user) => {
      return req.user.storeData(reqBody, req, res)
    })
    .then((result => {

      if (req.body?.time) {
        Appointment.findById({ _id: time })
          .then((app) => {
            app.isTimeSlotAvailable = false
            app.userId = userId;
            return app.save()
          })
          .then(result => {
            if (result) {
              setSingleMsg(req,
                msgObj(msgData.setMsgType(msgData.success),
                  msgData.updateSuccess))
              res.redirect(`/G_TEST`)
            }
          })
          .catch(err => console.log('err'))
      } else {
        setSingleMsg(req,
          msgObj(msgData.setMsgType(msgData.success),
            msgData.updateSuccess))
        res.redirect(`/G_TEST`)
      }

      // setSingleMsg(req,
      //   msgObj(msgData.setMsgType(msgData.success),
      //     msgData.updateSuccess))
      // res.redirect(`/G_TEST`)

    }))
    .catch(err => {
      console.log(err)
    })

}