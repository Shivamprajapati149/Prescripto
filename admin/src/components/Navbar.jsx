import React from 'react'
import {assets} from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

 const navigate = useNavigate();
    const{aToken, setAToken} = useContext(AdminContext);


    const logout  = () =>{
       navigate('/')
        aToken && setAToken('');
          aToken && localStorage.removeItem("aToken");
         
    }



  return (
    <div className='flex justify-between items-center py-3 sm:px-10 border-b bg-white'>
        <div className='flex items-center'>
            <img className='cursor-pointer w-36 sm:w-40' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 '>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout}   style={{ backgroundColor: "#5F6FFF" }} className='text-white text-sm px-10 py-2 rounded-full border-black cursor-pointer'>Logout</button>
      
    </div>
  )
}

export default Navbar
