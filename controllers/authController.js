const bcrypt = require('bcrypt');
const User = require('../models/user')
const { msgData, getMsg, setSingleMsg, msgObj } = require('../Util/message')
const { emailExam } = require('../Util/pattern')

const saltRounds = 12;

// get Login
exports.getLoginPage = (req, res, next) => {
  const message = getMsg(req, msgData.nowMsgType)
  res.render('auth/login', {
    pageTitle: 'LOGIN',
    path: '/LOGIN',
    message,
  })
}

// post login
exports.postSignInHandler = (req, res, next) => {
  const { userName, password } = req.body
  console.log('req.body', req.body)
  if (!emailExam.test(userName)) {
    setSingleMsg(req,
      msgObj(msgData.setMsgType(msgData.error),
        msgData.emailFormatWrong))
    return res.redirect('/auth/login');
  }

  User.findOne({ userName })
    .then(user => {
      if (!user) {
        setSingleMsg(req,
          msgObj(msgData.setMsgType(msgData.error),
            msgData.notFoundUser))
        return res.redirect('/auth/login');
      }

      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);

              setSingleMsg(req,
                msgObj(msgData.setMsgType(msgData.success),
                  msgData.signInSuccess))
              res.redirect('/');
            });
          }

          setSingleMsg(req,
            msgObj(msgData.setMsgType(msgData.error),
              msgData.invalidInput))
          return res.redirect('/auth/login');
        })
        .catch(err => {
          // console.log(err);
          return res.redirect('/auth/login');
        })
    })
}

// log out
exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/auth/login');
  });
};

// get sign up
exports.postSignup = (req, res, next) => {
  const { userName, password, confirmPw, userType } = req.body
  User.findOne({ userName })
    .then(foundUser => {
      if (foundUser) {
        setSingleMsg(req,
          msgObj(msgData.setMsgType(msgData.error),
            msgData.emailExist))
        return res.redirect('/auth/login');
      }

      if (!emailExam.test(userName)) {
        setSingleMsg(req,
          msgObj(msgData.setMsgType(msgData.error),
            msgData.emailFormatWrong))
        return res.redirect('/auth/login');
      }

      if (password !== confirmPw) {
        setSingleMsg(req,
          msgObj(msgData.setMsgType(msgData.error),
            msgData.pwDifference))
        return res.redirect('/auth/login');
      }

      return bcrypt
        .hash(password, saltRounds)
        .then(hashedPassword => {
          const user = new User({
            userName,
            password: hashedPassword,
            userType,
          })
          return user.save();
        })
        .then(result => {
          if (result) {
            setSingleMsg(req,
              msgObj(msgData.setMsgType(msgData.success),
                msgData.signupSuccess))
            res.redirect('/auth/login');
          }
        })
        .catch(err => {
          console.log('signup save err', err);
        });
    })
    .catch(err => {
      msgData.nowMsgType = 'error'
      // console.log('err', err)
      const errs = Object.keys(err.errors)

      const msgObg = []
      errs.map(item => msgObg.push({
        msgType: item,
        msg: err.errors[item].properties.message
      }))

      req.flash(msgData.nowMsgType, msgObg);
      return res.redirect('/auth/login');
    })
}