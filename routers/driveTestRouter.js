const express = require('express')
const router = express.Router()
const driveTestController = require('../controllers/driveTestController')
const G2TestController = require('../controllers/G2TestController')
const GTestController = require('../controllers/GTestController')

// Dashboard
router.get('/', driveTestController.getDashboard)


// G2_Test
router.get('/G2_TEST', G2TestController.getG2TEST)
router.post('/G2_TEST', G2TestController.postG2TestData)


// G_Test
router.get('/G_TEST', GTestController.getGTEST)
router.post('/G_TEST', GTestController.postGTestData)
router.get('/G_TEST/:id', GTestController.getUserIdGTEST)
router.post('/G_TEST_Edit', GTestController.postEditGTestData)


module.exports = router