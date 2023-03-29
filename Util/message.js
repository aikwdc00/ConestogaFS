exports.msgData = {
  error: 'error',
  success: 'success',
  nowMsgType: '',
  emailFormatWrong: 'E-mail format is wrong',
  emailExist: 'E-Mail exists already, please pick a different one',
  pwDifference: `it\'s different between password and  confirm password`,
  signupSuccess: 'Please login your account!!',
  invalidInput: 'Invalid email or password.',
  notFoundUser: 'Not Found User, Please sign up an account!!',
  signInSuccess: 'Sign in success!!',
  incompleteData: 'Please complete all information on G2 page!!',
  alreadyCompleteData: 'Already done all Data, you can update your data on this page!!',
  updateSuccess: 'Success Updated',
  bookingSuccess: 'Booking success!!',
  bookingFailed: 'Booking failed, please choose other time!!',
  bookDateUndefined: 'Please choose a booking date!!',
  setMsgType(val) {
    return this.nowMsgType = val
  }
}

exports.getMsg = (req, msg) => {
  const messages = req.flash(msg);
  let message = []

  if (messages.length) {
    message = messages
  } else {
    message = null;
  }

  return message
}

exports.msgObj = (type, msg) => ({
  type,
  msg
})

exports.setSingleMsg = (req, msgObj) => {
  const { type, msg } = msgObj
  req.flash(type, [{ type, msg }]);
}

exports.multipleMsg = (req, res, err) => {

  const errors = err.errors
  const errs = Object.keys(errors)
  let msgObg = []

  errs.map(item => msgObg.push({
    type: this.msgData.setMsgType(this.msgData.error),
    msgType: item,
    msg: errors[item].properties.message
  }))

  req.flash(this.msgData.setMsgType(this.msgData.error), msgObg);
  return res.redirect('/G2_TEST');
}