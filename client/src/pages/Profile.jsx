import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
    const user = useSelector(state => state.user)
    const [userData,setUserData] = useState({
        name : user.name,
        email : user.email,
        mobile : user.mobile,
    })
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
        })
    },[user])

    const handleOnChange  = (e)=>{
        const { name, value} = e.target 

        setUserData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data : userData
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }

    }
    return (
            <section className="px-4 py-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-emerald-800">Your Profile</h1>
                        <p className="text-sm text-emerald-600">Manage your personal information</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 md:p-12">
                        <form className="w-full grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid">
                        <label className="text-base sm:text-lg font-medium mb-1 text-emerald-800">Name <span className="text-rose-500">*</span></label>
                        <input
                            type='text'
                            placeholder='Enter your name' 
                            className='p-3 bg-emerald-50 outline-none border border-emerald-100 focus-within:border-emerald-300 rounded text-base sm:text-lg'
                            value={userData.name ?? ''}
                            name='name'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="grid">
                        <label htmlFor='email' className="text-base sm:text-lg font-medium mb-1 text-emerald-800">Email <span className="text-rose-500">*</span></label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email' 
                            className='p-3 bg-emerald-50 outline-none border border-emerald-100 focus-within:border-emerald-300 rounded text-base sm:text-lg opacity-70 cursor-not-allowed'
                            value={userData.email ?? ''}
                            name='email'
                            onChange={handleOnChange}
                            disabled
                            aria-disabled="true"
                        />
                    </div>
                    <div className="grid">
                        <label htmlFor='mobile' className="text-base sm:text-lg font-medium mb-1 text-emerald-800">Mobile <span className="text-rose-500">*</span></label>
                        <input
                            type='text'
                            id='mobile'
                            placeholder='Enter your mobile' 
                            className='p-3 bg-emerald-50 outline-none border border-emerald-100 focus-within:border-emerald-300 rounded text-base sm:text-lg'
                            value={userData.mobile ?? ''}
                            name='mobile'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                                    <button
                                        type="submit"
                                        className={`w-full flex justify-center items-center gap-2 py-3 rounded-md text-white font-semibold transition ${loading ? 'bg-emerald-500/80' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                        </form>
                    </div>
                </div>
            </section>
    )
}

export default Profile
