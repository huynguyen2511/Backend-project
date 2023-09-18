import * as controller from '../controllers'
import express from 'express'

const router = express.Router()

router.post('/register', controller.register)
router.post('/login', controller.login)

/** Employer */
router.post('/employer/signup', controller.employerRegister)
router.post('/employer/login', controller.employerLogin)

module.exports = router