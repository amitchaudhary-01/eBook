import express from 'express'
import Create from '../controller/user_controller.js'

const router = express.Router()

router.post('/create',Create)


export default router