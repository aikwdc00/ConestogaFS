const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// login
router.get('/login', authController.getLoginPage)
router.post('/postSignIn', authController.postSignInHandler)
router.post('/logout', authController.postLogout)


// sign up
router.post('/signup', authController.postSignup)

module.exports = router