import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import { FiShoppingCart } from 'react-icons/fi'

const minPasswordLength = 6

const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [data,setData] = useState({
    email : "",
    newPassword : "",
    confirmPassword : ""
  })
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [errors,setErrors] = useState({})
    const [submitting,setSubmitting] = useState(false)

    const valideValue = Object.values(data).every(el => el)

  useEffect(()=>{
    if(!(location?.state?.data?.success)){
        navigate("/")
    }

    if(location?.state?.email){
        setData((preve)=>{
            return{
                ...preve,
                email : location?.state?.email
            }
        })
    }
  },[])

  const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

//   console.log("data reset password",data)

  const validate = (values)=>{
    const err = {}
    if(!values.newPassword) err.newPassword = 'New password is required'
    else if(values.newPassword.length < minPasswordLength) err.newPassword = `Password must be at least ${minPasswordLength} characters`

    if(!values.confirmPassword) err.confirmPassword = 'Please confirm your password'
    else if(values.newPassword !== values.confirmPassword) err.confirmPassword = 'Passwords do not match'

    return err
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const validation = validate(data)
    setErrors(validation)
    if(Object.keys(validation).length) return

    try {
        setSubmitting(true)
        const response = await Axios({
            ...SummaryApi.resetPassword, //change
            data : data
        })
        
        if(response.data.error){
            toast.error(response.data.message)
        }

        if(response.data.success){
            toast.success(response.data.message)
            navigate("/login")
            setData({
                email : "",
                newPassword : "",
                confirmPassword : ""
            })
            
        }

    } catch (error) {
        AxiosToastError(error)
    } finally {
        setSubmitting(false)
    }


}

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 sm:px-6 py-8">
            <div className="w-full max-w-md mx-auto rounded-2xl shadow-2xl bg-white p-6 sm:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-emerald-500 to-lime-500 text-white flex items-center justify-center text-xl"><FiShoppingCart/></div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-extrabold text-emerald-900">Set a new password</h2>
                    <p className="text-sm text-slate-500">Create a strong password to protect your account</p>
                  </div>
                </div>

                <form className="grid gap-4 py-3 w-full" onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-1">
                        <label htmlFor='newPassword' className="text-sm font-medium">New password</label>
                        <div className={`p-2 rounded-md flex items-center ${errors.newPassword ? 'border border-red-300 bg-red-50' : 'border border-emerald-100 bg-emerald-50'}`}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='newPassword'
                                aria-invalid={errors.newPassword ? 'true' : 'false'}
                                aria-describedby={errors.newPassword ? 'new-error' : undefined}
                                className='w-full bg-transparent outline-none text-base sm:text-lg'
                                name='newPassword'
                                value={data.newPassword}
                                onChange={(e)=>{ handleChange(e); setErrors(prev=>({...prev,newPassword: undefined})) }}
                                placeholder='Enter your new password'
                            />
                            <button type='button' onClick={() => setShowPassword(preve => !preve)} className='text-slate-600 hover:text-slate-800 ml-2' aria-label={showPassword? 'Hide password' : 'Show password'}>{showPassword ? (<FaRegEye />) : (<FaRegEyeSlash />)}</button>
                        </div>
                        {errors.newPassword && <div id='new-error' className='text-xs text-red-600 mt-1'>{errors.newPassword}</div>}
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor='confirmPassword' className="text-sm font-medium">Confirm password</label>
                        <div className={`p-2 rounded-md flex items-center ${errors.confirmPassword ? 'border border-red-300 bg-red-50' : 'border border-emerald-100 bg-emerald-50'}`}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                                aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                                className='w-full bg-transparent outline-none text-base sm:text-lg'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={(e)=>{ handleChange(e); setErrors(prev=>({...prev,confirmPassword: undefined})) }}
                                placeholder='Enter your confirm password'
                            />
                            <button type='button' onClick={() => setShowConfirmPassword(preve => !preve)} className='text-slate-600 hover:text-slate-800 ml-2' aria-label={showConfirmPassword? 'Hide password' : 'Show password'}>{showConfirmPassword ? (<FaRegEye />) : (<FaRegEyeSlash />)}</button>
                        </div>
                        {errors.confirmPassword && <div id='confirm-error' className='text-xs text-red-600 mt-1'>{errors.confirmPassword}</div>}
                    </div>
                    <button disabled={submitting} type="submit" className={`w-full flex justify-center items-center gap-2 py-3 rounded-md text-white font-semibold transition ${submitting ? 'bg-emerald-600/80 cursor-wait' : 'bg-emerald-700 hover:bg-emerald-600'}`}>{submitting ? 'Saving...' : 'Change Password'}</button>
                </form>
                <p className='text-center text-base sm:text-lg mt-3'>
                    Already have an account? <Link to={'/login'} className='font-semibold text-emerald-700 hover:text-emerald-800'>Login</Link>
                </p>
            </div>
        </section>
  )
}

export default ResetPassword
