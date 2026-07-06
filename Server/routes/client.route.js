import express from 'express'
import Create, { signIn } from '../controller/client_controller.js'

const router = express.Router()

router.post('/create', Create)
router.post('/signin', signIn)

export default router