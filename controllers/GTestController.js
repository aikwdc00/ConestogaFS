const User = require('../models/user')
const { getMsg, setSingleMsg, msgObj } = require('../Util/message')


// G Test
exports.getGTEST = (req, res, next) => {
  const message = getMsg(req, 'success')

  res.render('driveTest/G', {
    pageTitle: 'G_TEST',
    path: '/G_TEST',
    user: null,
    message,
  })

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

  const message = getMsg(req, 'success')

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

  User.findById(reqBody.userId)
    .then((user) => {
      user.car_details.make = reqBody.ieMake
      user.car_details.model = reqBody.model
      user.car_details.year = reqBody.year
      user.car_details.platNo = reqBody.platNumber

      return user.save()
    })
    .then((result => {
      setSingleMsg(req, msgObj('success', 'success Updated'))
      // req.flash('success', [{ msg: 'success Updated' }]);
      res.redirect(`/G_TEST/${result._id}`)
    }))
    .catch(err => {
      console.log(err)
    })

}