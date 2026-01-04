import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    })
    const navigate = useNavigate()
    const [errors,setErrors] = useState({})
    const [submitting,setSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)

    const validate = (values)=>{
        const err = {}
        if(!values.email) err.email = 'Email is required'
        else if(!emailRegex.test(values.email)) err.email = 'Enter a valid email address'
        return err
    }


    const handleSubmit = async(e)=>{
        e.preventDefault()
        const validation = validate(data)
        setErrors(validation)
        if(Object.keys(validation).length) return

        try{
            setSubmitting(true)
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verification-otp",{ state : data })
                setData({ email : "" })
            }

        } catch (error){
            AxiosToastError(error)
        } finally{
            setSubmitting(false)
        }
    }

    return (
        <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 sm:px-6 py-8">
            <div className="w-full max-w-md mx-auto rounded-2xl shadow-2xl bg-white p-6 sm:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-emerald-500 to-lime-500 text-white flex items-center justify-center text-xl"><FiShoppingCart/></div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-extrabold text-emerald-900">Forgot your password?</h2>
                    <p className="text-sm text-slate-500">Enter your email and we'll send a verification code</p>
                  </div>
                </div>

                <form className="grid gap-4 py-3 w-full" onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-1">
                        <label htmlFor='email' className="text-sm font-medium">Email</label>
                        <input
                            type='email'
                            id='email'
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            className={`p-3 border rounded-md text-base sm:text-lg focus:outline-none ${errors.email ? 'border-red-300 bg-red-50' : 'border-emerald-100 bg-emerald-50'}`}
                            name='email'
                            value={data.email}
                            onChange={(e)=>{ handleChange(e); setErrors(prev=>({...prev,email: undefined})) }}
                            placeholder='you@company.com'
                        />
                        {errors.email && <div id="email-error" className="text-xs text-red-600 mt-1">{errors.email}</div>}
                    </div>
                    <button disabled={submitting} type="submit" className={`w-full flex justify-center items-center gap-2 py-3 rounded-md text-white font-semibold transition ${submitting ? 'bg-emerald-600/80 cursor-wait' : 'bg-emerald-700 hover:bg-emerald-600'}`}>{submitting ? 'Sending...' : 'Send OTP'}</button>
                </form>
                <p className='text-center text-base sm:text-lg mt-3'>
                    Already have an account? <Link to={'/login'} className='font-semibold text-emerald-700 hover:text-emerald-800'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default ForgotPassword


