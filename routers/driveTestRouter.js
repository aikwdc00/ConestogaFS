const express = require('express')
const router = express.Router()
const driveTestController = require('../controllers/driveTestController')
const G2TestController = require('../controllers/G2TestController')
const GTestController = require('../controllers/GTestController')
const appointmentController = require('../controllers/appointmentController')
const isAuth = require('../middleware/is-auth')
const { isDriver, isAdmin } = require('../middleware/identify')

// Dashboard
router.get('/', driveTestController.getDashboard)


// G2_Test
router.get('/G2_TEST', isAuth, isDriver, G2TestController.getG2TEST)
// router.post('/G2_TEST', isAuth, isDriver, G2TestController.postG2TestData)
router.post('/G2_TEST', isAuth, isDriver, G2TestController.postG2TestEditData)


// G_Test
router.get('/G_TEST', isAuth, isDriver, GTestController.getGTEST)
router.post('/G_TEST', isAuth, isDriver, GTestController.postGTestData)
router.get('/G_TEST/:id', isAuth, isDriver, GTestController.getUserIdGTEST)
router.post('/G_TEST_Edit', isAuth, isDriver, GTestController.postEditGTestData)


// appointment
router.get('/appointment', isAuth, isAdmin, appointmentController.getAppointmentPage)
router.post('/postAppoint', isAuth, isAdmin, appointmentController.postAppointmentHandler)

module.exports = router