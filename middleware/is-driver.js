module.exports = (req, res, next) => {
  if (!req.user.isDriver()) {
    return res.redirect('/');
  }
  next();
}