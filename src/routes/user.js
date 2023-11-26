import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isUser } from '../middleware/verify_role'
import uploadCloud, { fields } from '../middleware/uploader'


const router = express.Router()
//PUBLIC ROUTES


router.get('/allCompanies', controller.getCompanies)
router.get('/searchedCompany', controller.getSearchedCompany)
router.use(verifyToken)
//PRIVATE ROUTES
router.use(isUser)
router.get('/', controller.getCurrent)
router.put('/updateInfo', controller.updateInfo)
router.put('/updateDemandJob', controller.updateDemandJob)
router.put('/changePassword', controller.changePassword)
router.post('/createCv', uploadCloud.single('cv_document') ,controller.createCvController)
router.get('/getUserCvs', controller.getUserCvs)
router.put('/setMainCv', controller.setCvMain)


module.exports = router