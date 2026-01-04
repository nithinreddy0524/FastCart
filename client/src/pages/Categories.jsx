import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Categories(){
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const navigate = useNavigate()

  const fetchCategories = async()=>{
    try{
      setLoading(true)
      const res = await Axios({ ...SummaryApi.categories_list })
      if(res.data.success){
        setCategories(res.data.data.items || res.data.data || [])
      }
    }catch(err){
      toast.error(err?.response?.data?.message || 'Could not load categories')
    }finally{setLoading(false)}
  }

  useEffect(()=>{ fetchCategories() }, [])

  return (
    <section className="px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-emerald-800">Categories</h2>
            <p className="text-sm text-emerald-600">Available categories</p>
          </div>
          <div>
            <button onClick={()=>navigate('/dashboard/categories/create')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md">+ Create Category</button>
          </div>
        </div>

        <div className="bg-white rounded-md shadow p-4">
          {/* Make the grid scrollable when there are many categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2">
            {loading ? (
              <div className="col-span-full text-center py-8">Loading...</div>
            ) : (
              categories.length ? categories.map(cat=> (
                <div key={cat._id} className="border rounded p-3 flex flex-col items-center text-center relative">
                  <div className="w-28 h-28 bg-emerald-50 rounded-lg overflow-hidden flex items-center justify-center mb-3">
                    {cat.image ? <img src={cat.image} alt={cat.name} className="object-cover w-full h-full" /> : <div className="text-emerald-400">No image</div>}
                  </div>
                  <div className="font-semibold text-emerald-800">{cat.name}</div>
                  <div className="text-sm text-emerald-600">{cat.itemCount ?? 0} items</div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={()=>navigate(`/dashboard/categories/${cat._id}`)}
                      className="text-sm px-3 py-1 bg-emerald-100 text-emerald-700 rounded-md"
                    >
                      View
                    </button>
                    <button
                      onClick={async()=>{
                        const ok = window.confirm('Delete this category? This action cannot be undone.')
                        if(!ok) return
                        try{
                          setDeletingId(cat._id)
                          const res = await Axios({ ...SummaryApi.categories_delete(cat._id) })
                          if(res.data.success){
                            toast.success(res.data.message || 'Category deleted')
                            setCategories(prev => prev.filter(c=> c._id !== cat._id))
                          }else{
                            toast.error(res.data.message || 'Could not delete category')
                          }
                        }catch(err){
                          toast.error(err?.response?.data?.message || 'Could not delete category')
                        }finally{
                          setDeletingId(null)
                        }
                      }}
                      disabled={deletingId === cat._id}
                      className={`text-sm px-3 py-1 rounded-md ${deletingId === cat._id ? 'bg-rose-300 text-white cursor-not-allowed' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
                    >
                      {deletingId === cat._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-8 text-emerald-600">No categories yet</div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
