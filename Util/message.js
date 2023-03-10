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