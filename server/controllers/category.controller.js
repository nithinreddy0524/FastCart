import CategoryModel from '../models/category.model.js'
import { uploadBufferToCloudinary } from '../config/cloudinary.js'

// create category
export async function createCategory(request, response) {
  try {
    const { name, image, itemCount, description, isActive } = request.body

    if (!name) {
      return response.status(400).json({
        message: 'Provide category name',
        error: true,
        success: false
      })
    }

    // prevent duplicate
    const existing = await CategoryModel.findOne({ name: name.trim() })
    if (existing) {
      return response.status(400).json({
        message: 'Category already exists',
        error: true,
        success: false
      })
    }

    let imageUrl = image || ''
    // if a file was uploaded via multer (memory storage), upload to Cloudinary
    if (request.file && request.file.buffer) {
      try {
        const result = await uploadBufferToCloudinary(request.file.buffer, { folder: 'fastcart/categories', resource_type: 'image' })
        imageUrl = result.secure_url || result.url || imageUrl
      } catch (err) {
        // log and continue, but respond with error
        return response.status(500).json({ message: 'Image upload failed', error: true, success: false })
      }
    }

    const payload = {
      name: name.trim(),
      image: imageUrl,
      itemCount: itemCount || 0,
      description: description || '',
      isActive: typeof isActive === 'boolean' ? isActive : true
    }

    const category = new CategoryModel(payload)
    const saved = await category.save()

    return response.json({
      message: 'Category created',
      data: saved,
      error: false,
      success: true
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

// list categories (with optional pagination)
export async function listCategories(request, response) {
  try {
    const { page = 1, limit = 50, search = '' } = request.query

    const query = {}
    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [items, total] = await Promise.all([
      CategoryModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      CategoryModel.countDocuments(query)
    ])

    return response.json({
      message: 'Categories list',
      data: {
        items,
        total,
        page: Number(page),
        limit: Number(limit)
      },
      error: false,
      success: true
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

// get single category
export async function getCategory(request, response) {
  try {
    const { id } = request.params
    const category = await CategoryModel.findById(id)
    if (!category) {
      return response.status(404).json({
        message: 'Category not found',
        error: true,
        success: false
      })
    }

    return response.json({
      message: 'Category details',
      data: category,
      error: false,
      success: true
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

// update category
export async function updateCategory(request, response) {
  try {
    const { id } = request.params
    const { name, image, itemCount, description, isActive } = request.body

    const update = {}

    if (name) update.name = name.trim()

    // handle file upload if provided
    if (request.file && request.file.buffer) {
      try {
        const result = await uploadBufferToCloudinary(request.file.buffer, { folder: 'fastcart/categories', resource_type: 'image' })
        update.image = result.secure_url || result.url
      } catch (err) {
        return response.status(500).json({ message: 'Image upload failed', error: true, success: false })
      }
    } else if (typeof image !== 'undefined') {
      update.image = image
    }

    if (typeof itemCount !== 'undefined') update.itemCount = itemCount
    if (typeof description !== 'undefined') update.description = description
    if (typeof isActive !== 'undefined') update.isActive = isActive

    const updated = await CategoryModel.findByIdAndUpdate(id, update, { new: true })
    if (!updated) {
      return response.status(404).json({
        message: 'Category not found',
        error: true,
        success: false
      })
    }

    return response.json({
      message: 'Category updated',
      data: updated,
      error: false,
      success: true
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

// delete category
export async function deleteCategory(request, response) {
  try {
    const { id } = request.params
    const removed = await CategoryModel.findByIdAndDelete(id)
    if (!removed) {
      return response.status(404).json({
        message: 'Category not found',
        error: true,
        success: false
      })
    }

    return response.json({
      message: 'Category deleted',
      data: removed,
      error: false,
      success: true
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
