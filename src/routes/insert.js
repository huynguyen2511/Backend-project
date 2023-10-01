import * as controller from '../controllers'
import express from 'express'

const router = express.Router()


router.post('/', controller.insertData)

module.exports = router