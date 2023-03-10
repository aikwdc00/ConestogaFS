const User = require('../models/user')

// Dashboard
exports.getDashboard = (req, res, next) => {
  res.render('driveTest/dashboard', { pageTitle: 'Dashboard', path: '/dashboard' })
}


