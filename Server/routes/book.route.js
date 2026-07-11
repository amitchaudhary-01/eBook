import newbook_controller from "../controller/newbook_controller.js"
import express from 'express'
import { upload } from "../middleware/multer.js"

const router = express.Router()

router.post('/add-book', upload.single('coverImage',newbook_controller))

export default router