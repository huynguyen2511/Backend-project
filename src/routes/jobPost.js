import * as controller from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isEmployer } from '../middleware/verify_role'

const router = express.Router()


router.get('/allPosts', controller.getPosts)
router.get('/searchedPosts', controller.getSearchedPosts)
router.use(verifyToken)

router.post('/create-new', isEmployer ,controller.createNewPost)
router.get('/allPostsByEmployer', isEmployer, controller.getPostsByEmployer)
router.delete('/deletePost',isEmployer, controller.deletePost)

module.exports = router