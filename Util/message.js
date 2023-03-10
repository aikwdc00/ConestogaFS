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
  updateSuccess: 'success Updated',
  setMsgType(val) {
    console.log('setMsgType', val)
    return this.nowMsgType = val
    console.log('this.nowMsgType', this.nowMsgType)
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

