const User = require('../models/user')
const Appointment = require('../models/appointment')
const bcrypt = require('bcrypt');
const saltRounds = 12;
const { getMsg, setSingleMsg, msgObj, msgData, multipleMsg } = require('../Util/message')
const pattern = require('../Util/pattern')
const { setDatesToString } = require('../Util/appointmentFn')

// G2 Test
exports.getG2TEST = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)
  const user = req.user

  // const { firstName, lastName, LicenseNo } = req.user
  // if (firstName !== 'default' && lastName !== 'default' && LicenseNo != 'default') {

  //   setSingleMsg(req,
  //     msgObj(msgData.setMsgType(msgData.error),
  //       msgData.alreadyCompleteData))
  //   return res.redirect('/G_TEST')
  // }

  // User.findById(user._id)
  //   .populate('appointmentsData.appointmentId')
  //   .then(foundUser => {
  //     console.log('foundUser', foundUser.appointmentsData)
  //   })
  //   .catch(err => console.log('err', err))

  Appointment
    .find()
    .populate('userId')
    .then((appsResult) => {

      console.log('appsResult', appsResult)
      const appointments = setDatesToString(appsResult)
      const filterData = appsResult.filter(item => item?.userId?._id.valueOf() == user._id)
      // console.log('filterData', filterData)
      res.render('driveTest/G2', {
        pageTitle: 'G2_TEST',
        path: '/G2_TEST',
        message,
        user,
        filterData,
        appointments,
      })
    })
    .catch(err => console.log('err', err))

}

exports.postG2TestData = (req, res, next) => {
  const reqBody = req.body
  const user = new User({
    firstName: reqBody.FirstName,
    lastName: reqBody.LastName,
    Age: +reqBody.Age,
    LicenseNo: reqBody?.LicenseNumber,
    car_details: {
      make: reqBody.ieMake,
      model: reqBody.model,
      year: reqBody.year,
      platNo: reqBody.platNumber,
    }
  })

  user.save()
    .then((user) => {
      res.redirect('/')
    })
    .catch(err => {
      const errs = Object.keys(err.errors)

      let msgObg = []
      errs.map(item => msgObg.push({
        msgType: item,
        msg: err.errors[item].properties.message
      }))

      req.flash('error', msgObg);
      return res.redirect('/G2_TEST');
    })
}

exports.postG2TestEditData = (req, res, next) => {
  // console.log('req.body', req.body)
  // return
  const { FirstName, LastName, Age, LicenseNumber, ieMake, model, year, platNumber, userId, date, time } = req.body

  if (!pattern.licenseNoExam.test(LicenseNumber) && req.user.LicenseNo === 'default') {
    setSingleMsg(req,
      msgObj(msgData.setMsgType(msgData.error),
        `${LicenseNumber} is a invalid LicenseNo`))
    return res.redirect(`/G2_TEST`)
  }

  User.findById(userId)
    .then((user) => {
      return req.user.storeData(req.body, req, res)
    })
    .then(result => {

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
              res.redirect(`/G2_TEST`)
            }
          })
          .catch(err => console.log('err'))
      } else {
        setSingleMsg(req,
          msgObj(msgData.setMsgType(msgData.success),
            msgData.updateSuccess))
        res.redirect(`/G2_TEST`)
      }

    })
    .catch(err => {
      multipleMsg(req, res, err)
    })
}