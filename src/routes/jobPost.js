import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'

const router = express.Router()


router.get('/allPosts', controller.getPosts)
router.use(verifyToken)

router.post('/create-new', controller.createNewPost)
router.get('/allPostsByEmployer', controller.getPostsByEmployer)

module.exports = router