const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 12;
const { getMsg, setSingleMsg, msgObj, msgData, multipleMsg } = require('../Util/message')
const pattern = require('../Util/pattern')

// G2 Test
exports.getG2TEST = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)
  const user = req.user
  const { firstName, lastName, LicenseNo } = req.user

  // if (firstName !== 'default' && lastName !== 'default' && LicenseNo != 'default') {

  //   setSingleMsg(req,
  //     msgObj(msgData.setMsgType(msgData.error),
  //       msgData.alreadyCompleteData))
  //   return res.redirect('/G_TEST')
  // }

  console.log('message', message)
  res.render('driveTest/G2', {
    pageTitle: 'G2_TEST',
    path: '/G2_TEST',
    message,
    user,
  })
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
  const { FirstName, LastName, Age, LicenseNumber, ieMake, model, year, platNumber, userId } = req.body

  if (!pattern.licenseNoExam.test(LicenseNumber)) {
    setSingleMsg(req,
      msgObj(msgData.setMsgType(msgData.error),
        `${LicenseNumber} is a invalid LicenseNo`))
    return res.redirect(`/G2_TEST`)
  }

  User.findById(userId)
    .then((user) => {

      return bcrypt
        .hash(LicenseNumber, saltRounds)
        .then(hashedLicenseNumber => {
          user.firstName = FirstName
          user.lastName = LastName
          user.Age = +Age
          user.LicenseNo = hashedLicenseNumber
          user.car_details.make = ieMake
          user.car_details.model = model
          user.car_details.year = year
          user.car_details.platNo = platNumber

          return user.save();
        })
        .then((result => {

          setSingleMsg(req,
            msgObj(msgData.setMsgType(msgData.success),
              msgData.updateSuccess))
          res.redirect(`/G_TEST/${result._id}`)
        }))
        .catch(err => {
          multipleMsg(req, res, err)
        });
    })
    .catch(err => {
      multipleMsg(req, res, err)
    })
}