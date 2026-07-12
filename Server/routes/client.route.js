import express from 'express';
// Fix: Correctly import GetClient as a named export
import Create, { logout, me, signIn, GetClient } from '../controller/client_controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { getUserProfile } from '../controller/user_controller.js';

const router = express.Router();

router.post('/create', Create);
router.post('/signin', signIn);
router.get('/me',isAuthenticated, me);
router.post('/logout', logout);

// Fix: Active route to fetch all clients
router.get('/getclients', GetClient);

router.get('/profile', isAuthenticated, getUserProfile);

export default router;