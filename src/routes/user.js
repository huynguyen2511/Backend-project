import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isUser } from '../middleware/verify_role'

const router = express.Router()
//PUBLIC ROUTES


router.use(verifyToken)
//PRIVATE ROUTES
router.use(isUser)
router.get('/', controller.getCurrent)
router.put('/updateInfo', controller.updateInfo)
router.put('/changePassword', controller.changePassword)

module.exports = router