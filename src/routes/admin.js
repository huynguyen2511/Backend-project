import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isAdmin } from '../middleware/verify_role'

const router = express.Router()

router.post('/register', controller.adminRegister)
router.post('/login', controller.adminLogin)

router.use(verifyToken)
router.use(isAdmin)
router.get('/getUsers', controller.getUsers)
router.get('/getEmployers', controller.getEmployers)
router.put('/setStatusEmployer', controller.setStatusEmployer)

module.exports = router