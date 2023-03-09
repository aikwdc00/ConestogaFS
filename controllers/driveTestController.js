const User = require('../models/user')

// Dashboard
exports.getDashboard = (req, res, next) => {
  res.render('driveTest/dashboard', { pageTitle: 'Dashboard', path: '/dashboard' })
}


// Login
exports.getLoginPage = (req, res, next) => {
  res.render('driveTest/Login', { pageTitle: 'LOGIN', path: '/LOGIN' })
}