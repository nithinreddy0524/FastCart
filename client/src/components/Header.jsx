import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMobile from '../hooks/useMobile';
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp  } from "react-icons/go";
import UserMenu from './UserMenu';
import { FiMenu, FiShoppingCart } from "react-icons/fi";

const Header = () => {
    const [ isMobile ] = useMobile()
    const navigate = useNavigate()
    const user = useSelector((state)=> state?.user)
    const [openUserMenu,setOpenUserMenu] = useState(false)
 
    const redirectToLoginPage = ()=>{
        navigate("/login")
    }

    const handleCloseUserMenu = ()=>{
        setOpenUserMenu(false)
    }

    const handleMobileUser = ()=>{
        if(!user._id){
            navigate("/login")
            return
        }

        navigate("/user")
    }

  return (
    <header className="sticky top-0 left-0 right-0 h-24 pt-1 lg:h-20 shadow-md flex flex-col justify-center gap-1 bg-gradient-to-r from-emerald-50 via-white to-emerald-100 z-50 border-b border-emerald-200">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 h-full">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => navigate('/')}> 
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-tr from-emerald-500 to-lime-600 text-white shadow-md">
            <FiShoppingCart size={20} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-emerald-700 tracking-tight">FastCart</span>
            <span className="text-xs text-slate-500">Smart shopping, faster checkout</span>
          </div>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {user?._id ? (
            <div className="relative">
              <div onClick={() => setOpenUserMenu(preve => !preve)} className="flex select-none items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-emerald-50 transition-all">
                {/* avatar initial */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-lime-400 text-white font-semibold shadow-sm">
                  <span className="text-sm">{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                </div>
                {/* user name */}
                <span className="font-medium text-emerald-800 text-sm md:text-base lg:text-lg truncate max-w-[12rem]">{user?.name || 'User'}</span>
                {openUserMenu ? <GoTriangleUp size={20} className="text-slate-600" /> : <GoTriangleDown size={20} className="text-slate-600" />}
              </div>
              {openUserMenu && (
                <div className="absolute right-0 top-12 z-50">
                  <div className="bg-white rounded-lg p-4 min-w-52 shadow-xl border border-emerald-100">
                    <UserMenu close={handleCloseUserMenu} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={redirectToLoginPage} className="text-sm md:text-base lg:text-lg px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition-all">Login</button>
          )}
        </div>
        {/* Mobile Menu Button */}
        <button className="text-emerald-700 lg:hidden p-2 rounded-lg hover:bg-emerald-50 transition-all border border-emerald-100 shadow-sm" onClick={handleMobileUser}>
          <FiMenu size={26} />
        </button>
      </div>
    </header>
  )
}

export default Header
