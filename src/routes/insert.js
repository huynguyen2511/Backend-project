import * as controller from '../controllers'
import express from 'express'

const router = express.Router()


router.get('/', controller.insertData)

module.exports = router