import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isEmployer } from '../middleware/verify_role'

const router = express.Router()

router.use(verifyToken)
router.get('/', controller.getCurrentEmployer)
router.post('/setting/company', controller.createNewCompany)

module.exports = router