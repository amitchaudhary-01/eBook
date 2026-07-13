import express from 'express';
import { upload } from '../middleware/multer.js';
import newbook_controller, { getBooks } from '../controller/newbook_controller.js'; 

const router = express.Router();

// Middleware wrapper to gracefully capture image validation errors
const handleCoverUpload = (req, res, next) => {
  uploadImage.single('coverImage')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.post('/add-book', handleCoverUpload, newbook_controller);
router.get('/', getBooks);

export default router;