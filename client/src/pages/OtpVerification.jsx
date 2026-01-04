import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi'

const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const [errors,setErrors] = useState("")
    const [submitting,setSubmitting] = useState(false)
    const location = useLocation()

    // console.log("location",location)

    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])

    const valideValue = data.every(el => el)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setErrors("")
        if(!valideValue){
            setErrors('Please enter the full 6-digit code')
            return
        }

        try{
            setSubmitting(true)
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data : {
                    otp : data.join(""),
                    email : location?.state?.email
                }
            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData(["","","","","",""])
                navigate("/reset-password",{
                    state : {
                        data : response.data,
                        email : location?.state?.email
                    }
                })
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
                    <h2 className="text-lg sm:text-2xl font-extrabold text-emerald-900">Enter verification code</h2>
                    <p className="text-sm text-slate-500">We sent a 6-digit code to your email</p>
                  </div>
                </div>

                <form className="grid gap-4 py-3 w-full" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor='otp' className="text-sm font-medium">Enter your OTP</label>
                        <div className='flex items-center gap-2 justify-between mt-3'>
                            {
                                data.map((element,index)=>{
                                    return(
                                        <input
                                            key={"otp"+index}
                                            type='text'
                                            inputMode='numeric'
                                            pattern='[0-9]*'
                                            aria-label={`OTP digit ${index+1}`}
                                            ref={(ref)=>{ inputRef.current[index] = ref; return ref }}
                                            value={data[index]}
                                            onChange={(e)=>{
                                                const value =  e.target.value.replace(/[^0-9]/g,'')
                                                const newData = [...data]
                                                newData[index] = value
                                                setData(newData)
                                                if(value && index < 5){
                                                    inputRef.current[index+1]?.focus()
                                                }
                                            }}
                                            maxLength={1}
                                            className='bg-emerald-50 w-full max-w-14 p-3 border rounded outline-none border-emerald-100 text-center font-semibold text-base sm:text-lg'
                                        />
                                    )
                                })
                            }
                        </div>
                        {errors && <div className='text-xs text-red-600 mt-2'>{errors}</div>}
                    </div>
                    <button disabled={submitting} type="submit" className={`w-full flex justify-center items-center gap-2 py-3 rounded-md text-white font-semibold transition ${submitting ? 'bg-emerald-600/80 cursor-wait' : 'bg-emerald-700 hover:bg-emerald-600'}`}>{submitting ? 'Verifying...' : 'Verify OTP'}</button>
                </form>
                <p className='text-center text-base sm:text-lg mt-3'>
                    Already have an account? <Link to={'/login'} className='font-semibold text-emerald-700 hover:text-emerald-800'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default OtpVerification