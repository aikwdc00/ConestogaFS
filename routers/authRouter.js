const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// login
router.get('/LOGIN', authController.getLoginPage)
router.post('/auth/postLogin', authController.postLoginHandler)



// sign up
router.post('/signup', authController.postSignup)

module.exports = router