import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function CreateCategory(){
  const [form, setForm] = useState({ name: '', itemCount: '', imageFile: null })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [existingImage, setExistingImage] = useState(null)
  const navigate = useNavigate()

  // detect edit query param and load category details when present
  useEffect(()=>{
    try{
      const params = new URLSearchParams(location.search)
      const editId = params.get('edit')
      if(editId){
        ;(async ()=>{
          try{
            setSubmitting(true)
            const res = await Axios({ ...SummaryApi.categories_get(editId) })
            if(res.data.success && res.data.data){
              const data = res.data.data
              setForm({ name: data.name || '', itemCount: String(data.itemCount ?? '' ) , imageFile: null })
              setExistingImage(data.image || null)
              setEditingId(editId)
            }else{
              toast.error(res.data.message || 'Could not load category for edit')
            }
          }catch(err){
            toast.error(err?.response?.data?.message || 'Could not load category for edit')
          }finally{setSubmitting(false)}
        })()
      }
    }catch(e){
      // ignore parsing errors
    }
  }, [])

  const handleChange = (e)=>{
    const { name, value, files } = e.target
    if(name === 'image'){
      setForm(prev=> ({ ...prev, imageFile: files[0] }))
      setErrors(prev=> ({ ...prev, image: '' }))
    } else {
      setForm(prev=> ({ ...prev, [name]: value }))
      setErrors(prev=> ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
  // client-side validation
  const newErrors = {}
  if(!form.name || !form.name.trim()) newErrors.name = 'Name is required'
  const cnt = Number(form.itemCount)
  if(form.itemCount === '' || Number.isNaN(cnt)) newErrors.itemCount = 'Number of items is required and must be a number'
  if(cnt < 0) newErrors.itemCount = 'Number of items cannot be negative'
  // image required only when creating new category
  if(!editingId && !form.imageFile) newErrors.image = 'Image is required'

    if(Object.keys(newErrors).length){
      setErrors(newErrors)
      return
    }
    try{
      setSubmitting(true)
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('itemCount', form.itemCount)
      // append image only when a new file was selected
      if(form.imageFile) fd.append('image', form.imageFile)

      if(editingId){
        const res = await Axios({
          url: SummaryApi.categories_update(editingId).url,
          method: SummaryApi.categories_update(editingId).method,
          data: fd,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if(res.data.success){
          toast.success(res.data.message || 'Category updated')
          navigate('/dashboard/categories')
        }
      }else{
        const res = await Axios({
          url: SummaryApi.categories_create.url,
          method: SummaryApi.categories_create.method,
          data: fd,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if(res.data.success){
          toast.success('Category created')
          navigate('/dashboard/categories')
        }
      }
    }catch(err){
      toast.error(err?.response?.data?.message || (editingId ? 'Update failed' : 'Create failed'))
    }finally{setSubmitting(false)}
  }

  return (
    <section className="px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-emerald-800">{editingId ? 'Edit Category' : 'Create Category'}</h2>
          <p className="text-sm text-emerald-600">{editingId ? 'Update product category details' : 'Add a new product category'}</p>
        </div>

        <div className="bg-white rounded-md shadow p-6">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-emerald-800">Name <span className="text-red-500">*</span></label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded mt-1 ${errors.name ? 'border-red-400' : 'border-emerald-100'}`}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <div id="name-error" className="text-red-600 text-sm mt-1">{errors.name}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-800">Number of items <span className="text-red-500">*</span></label>
              <input
                name="itemCount"
                value={form.itemCount}
                onChange={handleChange}
                type="number"
                min="0"
                className={`w-full p-3 border rounded mt-1 ${errors.itemCount ? 'border-red-400' : 'border-emerald-100'}`}
                aria-invalid={errors.itemCount ? 'true' : 'false'}
                aria-describedby={errors.itemCount ? 'itemCount-error' : undefined}
              />
              {errors.itemCount && <div id="itemCount-error" className="text-red-600 text-sm mt-1">{errors.itemCount}</div>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-emerald-800">Image <span className="text-red-500">*</span></label>
              {existingImage && !form.imageFile && (
                <div className="mb-2">
                  <div className="text-sm text-emerald-700">Current image</div>
                  <div className="w-40 h-28 mt-2 overflow-hidden rounded-md border"><img src={existingImage} alt="current" className="object-cover w-full h-full"/></div>
                </div>
              )}
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className={`w-full mt-1 ${errors.image ? 'border-red-400' : ''}`}
                aria-invalid={errors.image ? 'true' : 'false'}
                aria-describedby={errors.image ? 'image-error' : undefined}
              />
              {errors.image && <div id="image-error" className="text-red-600 text-sm mt-1">{errors.image}</div>}
              {form.imageFile && (
                <div className="mt-2 text-sm text-emerald-700">Selected file: {form.imageFile.name}</div>
              )}
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <button type="submit" disabled={submitting} className="bg-emerald-600 disabled:bg-emerald-400 text-white px-4 py-2 rounded-md">{submitting ? (editingId ? 'Updating...' : 'Saving...') : (editingId ? 'Update Category' : 'Create Category')}</button>
              <button type="button" onClick={()=>navigate('/dashboard/categories')} className="px-4 py-2 rounded-md border">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
