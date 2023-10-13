import * as controller from '../controllers'
import express from 'express'

const router = express.Router()


router.post('/', controller.insertData)
router.get('/getProvince', controller.getProvince)

module.exports = router