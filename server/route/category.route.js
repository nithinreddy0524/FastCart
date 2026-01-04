import { Router } from 'express'
import auth from '../middleware/auth.js'
import multer from 'multer'
import { createCategory, listCategories, getCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js'

const router = Router()

// multer in-memory storage for direct upload to Cloudinary
const storage = multer.memoryStorage()
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

// public: list and get
router.get('/', listCategories)
router.get('/:id', getCategory)

// protected: create, update, delete
// Accept image file under field name 'image'
router.post('/', auth, upload.single('image'), createCategory)
router.put('/:id', auth, upload.single('image'), updateCategory)
router.delete('/:id', auth, deleteCategory)

export default router
