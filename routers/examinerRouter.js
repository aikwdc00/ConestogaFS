const express = require('express')
const router = express.Router()
const examinerControllers = require('../controllers/examinerControllers')
const isAuth = require('../middleware/is-auth')
const { isExaminer } = require('../middleware/identify')

// get examiner page
router.get('/AccessExaminerPage', isAuth, isExaminer, examinerControllers.getExamPage)

// view driver info detail
router.get('/driverDetail/:id', isAuth, isExaminer, examinerControllers.getDriverInfoDetail)
router.post('/examinerEvaluate', isAuth, isExaminer, examinerControllers.postExaminerEvaluate)



module.exports = router