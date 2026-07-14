import express from 'express';
import { upload } from '../middleware/multer.js';
// Import deleteBook alongside getBooks
import newbook_controller, { deleteBook, getBooks } from '../controller/newbook_controller.js'; 

const router = express.Router();

const handleCoverUpload = (req, res, next) => {
  upload.single('coverImage')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.post('/add-book', handleCoverUpload, newbook_controller);
router.get('/', getBooks);

// Use deleteBook here instead of deleteClient
router.delete('/delete/:id', deleteBook);

export default router;