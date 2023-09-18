import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import employer from '../controllers/employer'

const router = express.Router()

// router.use(verifyToken)
router.get('/', employer.getEmployer)

module.exports = router