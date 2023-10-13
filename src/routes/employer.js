import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'

const router = express.Router()

router.use(verifyToken)

router.get('/', controller.getCurrentEmployer)
router.put('/updateEmployer', controller.updateEmployer)

router.put('/setting/updateCompany', controller.updateCompany)
router.put('/setting/updateLicense', controller.updateLicense)
router.get('/getCompany', controller.getCompanyByEmployer)
router.get('/getLicense', controller.getLicenseByEmployer)

module.exports = router