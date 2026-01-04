import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { FiShoppingCart } from 'react-icons/fi'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

// Small client-side validators
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const minPasswordLength = 6

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

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

    const validate = (values) => {
        const err = {}
        if(!values.email) err.email = 'Email is required'
        else if(!emailRegex.test(values.email)) err.email = 'Enter a valid email address'

        if(!values.password) err.password = 'Password is required'
        else if(values.password.length < minPasswordLength) err.password = `Password must be at least ${minPasswordLength} characters`

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
                ...SummaryApi.login,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('accesstoken',response.data.data.accesstoken)
                localStorage.setItem('refreshToken',response.data.data.refreshToken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email : "",
                    password : "",
                })
                navigate("/")
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
                    <h2 className="text-lg sm:text-2xl font-extrabold text-emerald-900">Welcome to FastCart</h2>
                    <p className="text-sm text-slate-500">Sign in to continue to your account</p>
                  </div>
                </div>

                <form className="grid gap-4 py-3 w-full" onSubmit={handleSubmit} noValidate>
                    <div className='grid gap-1'>
                        <label htmlFor='email' className="text-sm font-medium">Email</label>
                        <input
                            type='email'
                            id='email'
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className={`p-3 border rounded-md text-base sm:text-lg focus:outline-none ${errors.email ? 'border-red-300 bg-red-50' : 'border-emerald-100 bg-emerald-50'} `}
                            name='email'
                            value={data.email}
                            onChange={(e)=>{ handleChange(e); setErrors(prev=> ({...prev, email: undefined})) }}
                            placeholder='you@company.com'
                        />
                        {errors.email && <div id="email-error" className="text-xs text-red-600 mt-1">{errors.email}</div>}
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='password' className="text-sm font-medium">Password</label>
                        <div className={`p-2 rounded-md flex items-center ${errors.password ? 'border border-red-300 bg-red-50' : 'border border-emerald-100 bg-emerald-50'}`}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                aria-invalid={errors.password ? "true" : "false"}
                                aria-describedby={errors.password ? "password-error" : undefined}
                                className='w-full bg-transparent outline-none text-base sm:text-lg'
                                name='password'
                                value={data.password}
                                onChange={(e)=>{ handleChange(e); setErrors(prev=> ({...prev, password: undefined})) }}
                                placeholder='Enter your password'
                            />
                            <button type="button" onClick={() => setShowPassword(preve => !preve)} aria-label={showPassword ? 'Hide password' : 'Show password'} className='text-slate-600 hover:text-slate-800 ml-2'>
                                {showPassword ? (<FaRegEye />) : (<FaRegEyeSlash />)}
                            </button>
                        </div>
                        {errors.password && <div id="password-error" className="text-xs text-red-600 mt-1">{errors.password}</div>}

                        <div className='flex items-center justify-end mt-1'>
                            <Link to={"/forgot-password"} className='text-sm text-emerald-700 hover:text-emerald-800'>Forgot password?</Link>
                        </div>
                    </div>

                    <button disabled={submitting} type="submit" className={`w-full flex justify-center items-center gap-2 py-3 rounded-md text-white font-semibold transition ${submitting ? 'bg-emerald-600/80 cursor-wait' : 'bg-emerald-700 hover:bg-emerald-600'}`}>
                        {submitting ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className='mt-4 text-center text-sm text-slate-600'>
                    Don't have an account? <Link to={"/register"} className='font-semibold text-emerald-700 hover:text-emerald-800'>Create one</Link>
                </div>
            </div>
        </section>
    )
}

export default Login

