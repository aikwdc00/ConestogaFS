const User = require('../models/user')
const { getMsg, setSingleMsg, msgObj } = require('../Util/message')
let msgType = ''

// get Login
exports.getLoginPage = (req, res, next) => {
  const message = getMsg(req, msgType)
  console.log('message', message)
  res.render('driveTest/Login', { pageTitle: 'LOGIN', path: '/LOGIN', message })
}

// post login
exports.postLoginHandler = (req, res, next) => {
  const message = getMsg(req, msgType)
  res.render('driveTest/Login', { pageTitle: 'LOGIN', path: '/LOGIN', message })
}

// get sign up
exports.postSignup = (req, res, next) => {
  const { userName, password, confirmPw, userType } = req.body

  User.findOne({ userName })
    .then(foundUser => {
      if (foundUser) {
        msgType = 'error'
        setSingleMsg(req, msgObj('error', 'E-Mail exists already, please pick a different one'))
        return res.redirect('/auth/LOGIN');
      }

      if (password !== confirmPw) {
        msgType = 'error'
        setSingleMsg(req, msgObj('error', 'it\'s different between password and  confirm password'))
        return res.redirect('/auth/LOGIN');
      }

      const user = new User({
        userName,
        password,
        userType,
      })

      return user.save()
    })
    .then(result => {

      if (result) {
        msgType = 'success'
        setSingleMsg(req, msgObj(msgType, 'Please login your account!!'))
        res.redirect('/auth/LOGIN');
      }

    })
    .catch(err => {
      console.log('err', err)
      const errs = Object.keys(err.errors)

      const msgObg = []
      errs.map(item => msgObg.push({
        msgType: item,
        msg: err.errors[item].properties.message
      }))

      req.flash('error', msgObg);
      return res.redirect('/auth/LOGIN');
    })
}