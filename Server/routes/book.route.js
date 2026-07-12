import express from 'express';
import { upload } from '../middleware/multer.js';
// Updated filename here:
import newbook_controller, { getBooks } from '../controller/newbook_controller.js'; 

const router = express.Router();

router.post('/add-book', upload.single('coverImage'), newbook_controller);

router.get('/', getBooks);

export default router;