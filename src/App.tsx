import './App.css'
import Footer from './components/footer';
import Navbar from "./components/navbar";
import { Outlet } from 'react-router-dom';
import { loadAuthFromLocalStorage } from './utils/authLocalStorageUtils';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { rehydrate } from './redux/slices/authSlice';
import { useLocation } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import Sidebar from "./components/sidebar"

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const authData = loadAuthFromLocalStorage()
    if(authData) {
      dispatch(rehydrate(authData))
    }
  }, [dispatch])

  const isNotFoundPage = location.pathname === "/not-found-page"

  const handleSidebarOpen = () => {
    setSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <div className='relative'>
      <Sidebar open={sidebarOpen} handleClose={handleSidebarClose} />
      {!isNotFoundPage && <Navbar sidebarOpen={handleSidebarOpen} />}  
      <div className='flex justify-center rounded-t-lg'>
        <Outlet />
        <ToastContainer position='bottom-center' transition={Zoom} closeButton={false} hideProgressBar stacked />
      </div>
      {!isNotFoundPage && <div className='w-full flex justify-center items-start'>
        <Footer />
      </div>}
    </div>
  )
}

export default App