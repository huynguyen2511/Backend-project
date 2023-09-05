import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isAdmin, isModerator } from '../middleware/verify_role'

const router = express.Router()
//PUBLIC ROUTES
// router.get('/', controller.getCurrent)

router.use(verifyToken)
//PRIVATE ROUTES
router.use(isModerator)
router.get('/', controller.getCurrent)

module.exports = router