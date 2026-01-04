import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'

export default function CategoryDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const fetchCategory = async()=>{
    try{
      setLoading(true)
      const res = await Axios({ ...SummaryApi.categories_get(id) })
      if(res.data.success){
        setCategory(res.data.data)
      }else{
        toast.error(res.data.message || 'Could not load category')
      }
    }catch(err){
      toast.error(err?.response?.data?.message || 'Could not load category')
    }finally{setLoading(false)}
  }

  useEffect(()=>{ if(id) fetchCategory() }, [id])

  const handleDelete = async()=>{
    const ok = window.confirm('Delete this category? This action cannot be undone.')
    if(!ok) return
    try{
      setDeleting(true)
      const res = await Axios({ ...SummaryApi.categories_delete(id) })
      if(res.data.success){
        toast.success(res.data.message || 'Category deleted')
        navigate('/dashboard/categories')
      }else{
        toast.error(res.data.message || 'Could not delete category')
      }
    }catch(err){
      toast.error(err?.response?.data?.message || 'Could not delete category')
    }finally{setDeleting(false)}
  }

  if(loading) return <div className="p-6 text-center">Loading...</div>

  if(!category) return <div className="p-6 text-center text-emerald-600">No category found</div>

  return (
    <section className="px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <button onClick={()=>navigate('/dashboard/categories')} className="text-sm text-emerald-600 underline">← Back to categories</button>
        </div>

        <div className="bg-white rounded-md shadow p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-48 h-48 bg-emerald-50 rounded overflow-hidden flex items-center justify-center">
              {category.image ? (
                <img src={category.image} alt={category.name} className="object-cover w-full h-full" />
              ) : (
                <div className="text-emerald-400">No image</div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-emerald-800">{category.name}</h2>
              <p className="text-sm text-emerald-600 mt-1">{category.itemCount ?? 0} items</p>
              {category.description && <p className="mt-4 text-emerald-700">{category.description}</p>}

              <div className="mt-6 flex gap-3">
                <button onClick={()=>navigate(`/dashboard/categories/create?edit=${category._id}`)} className="px-4 py-2 bg-emerald-600 text-white rounded-md">Edit</button>
                <button onClick={handleDelete} disabled={deleting} className={`px-4 py-2 rounded-md ${deleting ? 'bg-rose-300 text-white cursor-not-allowed' : 'bg-rose-600 text-white hover:bg-rose-700'}`}>
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
