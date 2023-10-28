import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import uploadCloud, { fields } from '../middleware/uploader'
import multer from 'multer'
import { isEmployer } from '../middleware/verify_role'

const router = express.Router()

router.use(verifyToken)
router.use(isEmployer)
router.get('/', controller.getCurrentEmployer)
router.put('/updateEmployer', controller.updateEmployer)

router.put('/setting/updateCompany', controller.updateCompany)
router.put('/setting/updateLicense', uploadCloud.single('related_documents') ,controller.updateLicense)
router.get('/getCompany', controller.getCompanyByEmployer)
router.get('/getLicense', controller.getLicenseByEmployer)

module.exports = router