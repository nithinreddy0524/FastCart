import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import GlobalProvider from './provider/GlobalProvider';

function App() {
  const dispatch = useDispatch()

  const fetchUser = async()=>{
      const userData = await fetchUserDetails()
      dispatch(setUserDetails(userData.data))
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <GlobalProvider> 
      <Header/>
    <main className='min-h-[68vh] mb-20'>
      <Outlet/>
    </main>
    <Footer />
      <Toaster
          position="bottom-center" // Toast position
          reverseOrder={false} // Whether to show toasts in reverse order
          toastOptions={{
            success: {
              duration: 3000, // Duration the toast stays on screen
              style: {
                backgroundColor: '#000000', // Toast background color
                color: 'white', // Text color
                fontSize: '16px', // Text size
                padding: '8px', // Padding around the toast
                borderRadius: '20px', // Rounded corners
                display: 'flex',
                alignItems: 'center', // Align icon and text vertically
              },
              icon:null,
              iconTheme: {
                primary: '#ffffff', // Primary icon color
                secondary: '#00ff00', // Secondary icon color
              },
            },
            error: {
              duration: 3000,
              style: {
                backgroundColor: '#000000', // Toast background color
                color: 'white', // Text color
                fontSize: '16px', // Text size
                padding: '8px', // Padding around the toast
                borderRadius: '20px', // Rounded corners
                display: 'flex',
                alignItems: 'center', // Align icon and text vertically
              },
              icon:null,
              iconTheme: {
                primary: '#ffffff',
                secondary: '#f44336',
              },
            },
          }}
          containerStyle={{
            bottom: '90px', // Adjust this value to move the toast higher or lower
          }}
      />       
    </GlobalProvider>
  )
}

export default App
