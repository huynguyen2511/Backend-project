import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isUser, isEmployer } from '../middleware/verify_role'

const router = express.Router()
router.use(verifyToken)

router.post('/createApplyCv',isUser,controller.createAppliedCv)
router.get('/getAppliedPosts',isUser,controller.getAppliedPosts)

router.get('/getAppliedCvs',isEmployer,controller.getAppliedCvs)

module.exports = router