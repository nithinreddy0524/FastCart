import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";

const UserMenu = ({close}) => {
   const user = useSelector((state)=> state.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = async()=>{
        try {
          const response = await Axios({
             ...SummaryApi.logout
          })
          // console.log("logout",response)
          if(response.data.success){
            if(close){
              close()
            }
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)

            // ✅ Send logout message to React Native WebView
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView?.postMessage("logout");
            }

            navigate("/")
          }
        } catch (error) {
          // console.log(error)
          AxiosToastError(error)
        }
   }

   const handleClose = ()=>{
      if(close){
        close()
      }
   }
  return (
    <div className="w-68">
        <div className='flex items-center gap-3 mb-3'>
          <div className='flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-lime-400 text-white font-semibold'>
            <span className='text-lg'>{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
          </div>
          <div>
            <div className='font-semibold text-emerald-800'>{user.name || user.mobile || 'User'}</div>
            <div className='text-xs text-slate-500'>{user.role === 'ADMIN' ? 'Administrator' : 'Member'}</div>
          </div>
        </div>

        <div className='text-sm grid border-t border-emerald-100 rounded-b-md overflow-hidden shadow-sm bg-white'>
          <Link onClick={handleClose} to={'/dashboard/profile'} className='flex justify-between items-center px-3 hover:bg-emerald-50 py-3 border-b'>
            <div>My Profile</div>
            <MdKeyboardArrowRight size={18} className='text-slate-500'/>
          </Link>

          <Link onClick={handleClose} to={'/dashboard/categories'} className='flex justify-between items-center px-3 hover:bg-emerald-50 py-3 border-b'>
            <div>Categories</div>
            <MdKeyboardArrowRight size={18} className='text-slate-500'/>
          </Link>

          <button onClick={handleLogout} className='flex justify-between items-center px-3 hover:bg-emerald-50 py-3'>
            <div className='text-left text-red-600 font-medium'>Log Out</div>
            <MdKeyboardArrowRight size={18} className='text-slate-500'/>
          </button>

        </div>
    </div>
  )
}

export default UserMenu
