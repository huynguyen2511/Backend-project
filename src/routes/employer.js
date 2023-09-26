import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'

const router = express.Router()

router.use(verifyToken)
router.get('/', controller.getCurrentEmployer)

module.exports = router