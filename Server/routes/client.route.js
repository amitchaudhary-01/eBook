import express from 'express'
import Create, { logout, me, signIn } from '../controller/client_controller.js'
import GetClient from '../controller/client_controller.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { getUserProfile } from '../controller/user_controller.js'
const router = express.Router()

router.post('/create', Create)

router.post('/signin', signIn)

router.get('/me',me)

router.post("/logout",logout)

router.get('/getclients', GetClient);

router.get('/profile', isAuthenticated, getUserProfile);

export default router