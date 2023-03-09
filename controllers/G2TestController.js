const User = require('../models/user')
const { getMsg } = require('../Util/message')

// G2 Test
exports.getG2TEST = (req, res, next) => {
  const message = getMsg(req, 'error')
  res.render('driveTest/G2', { pageTitle: 'G2_TEST', path: '/G2_TEST', message })
}

exports.postG2TestData = (req, res, next) => {
  const reqBody = req.body
  const user = new User({
    firstName: reqBody.FirstName,
    lastName: reqBody.LastName,
    Age: +reqBody.Age,
    LicenseNo: +reqBody?.LicenseNumber,
    DOB: reqBody.DOB,
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