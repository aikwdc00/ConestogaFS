exports.getMsg = (req, msg) => {
  const messages = req.flash(msg);
  let message = []

  if (messages.length > 0) {
    message = messages
  } else {
    message = null;
  }

  return message
}