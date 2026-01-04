import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Provide category name'],
    unique: true,
    trim: true
  },
  image: {
    // URL or path to image
    type: String,
    default: ''
  },
  itemCount: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const CategoryModel = mongoose.model('Category', categorySchema)

export default CategoryModel
