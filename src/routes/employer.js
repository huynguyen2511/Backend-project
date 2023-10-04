import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'

const router = express.Router()

router.use(verifyToken)

router.get('/', controller.getCurrentEmployer)
router.put('/setting/company', controller.updateCompany)
router.put('/setting/license', controller.updateLicense)

module.exports = router