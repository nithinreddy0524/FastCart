import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
import Login from './Login';

const UserMenuMobile = () => {
  const user = useSelector((state)=> state.user)
  return (
    <div>
      {(user?.email) ?
        (<section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-[calc(100vh-6rem)] flex items-center justify-center px-2 sm:px-4 h-full w-full py-2">
            <button onClick={()=>window.history.back()} className='mr-3 text-neutral-800 block w-fit ml-auto'>
              <IoClose size={25}/>
            </button>
            <div className='container mx-auto px-3 pb-8 w-full max-w-lg rounded-xl shadow-lg bg-white p-4 sm:p-8 md:p-12'>
              <UserMenu/>
            </div>
        </section>) : (
          <Login/>
        )
      }
    </div>
    
  )
}

export default UserMenuMobile
