import React, { use, useContext, useState } from 'react'
import '../index.css'
import {assets} from '../assets/assets'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
 //to navigate programmatically when we click on create account button
  //useNavigate is a hook from react-router-dom that returns a function that can be used  
  const Navigate = useNavigate();
    
  const {token, setToken} = useContext(AppContext);


  const [showMenu, setShowMenu] = React.useState(false);
 
    const logout =()=>{
      setToken(false)
      localStorage.removeItem('token')
      Navigate('/')
    
    }


  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b  border-b-gray-400'>
           <img onClick={()=>Navigate('/')} className ='w-44 cursor-pointer 'src={assets.logo} alt="" />
           <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to={'/'}>
                <li  className='py-1' >HOME</li>
                <hr style={{backgroundColor: '#5f6FFF'}} className='border-none outline-none h-0.5  w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to={'/doctors'}>
                <li className='py-1'>ALL DOCTORS</li>
                <hr style={{backgroundColor: '#5f6FFF'}} className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to={'/about'}>
                <li className='py-1' >ABOUT</li>
                <hr  style={{backgroundColor: '#5f6FFF'}} className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to={'/contact'}>
                <li className='py-1' >CONTACT</li>
                <hr style={{backgroundColor: '#5f6FFF'}}  className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            

           </ul>
           <div className='flex items-center gap-4'>
            {
              token 
              ? <div className='flex items-center gap-2  cursor-pointer  group relative'>
                <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                <img  className='w-2.5'   src={assets.dropdown_icon} alt="" />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                  <div className='min-w-48 bg-stone-100 rounded-fle flex-col gap-4 p-4'>
                  <p onClick={()=>Navigate('/my-profile')} className='hover:text-black cursor-pointer' >My Profile</p>
                  <p onClick={()=>Navigate('/my-appointments')}className='hover:text-black cursor-pointer' >My Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer' >Logout</p>
                </div>
                </div>
                
              </div> 
              :<button onClick={()=>Navigate('/login')}    style={{backgroundColor: '#5f6FFF'}}   className='text-white cursor-pointer px-8 py-3 rounded-full font-light hidden md:block'>Create account </button>
            }

            {/* Hamburger icon for mobile */}
            <img onClick={()=>setShowMenu(true)}   className='w-6 md:hidden' src={assets.menu_icon} alt="" />
           
            {/*mobile menu*/}
            
            <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
              <div className='flex items-center justify-center'>
                <img className='w-36' src={assets.logo} alt="" />
                <img className='w-7' onClick={()=>setShowMenu(false)}  src={assets.cross_icon} alt="" />
              </div>
              <ul className='flex flex-col items-center justify-center gap-2 mt-5 px-5 text-lg font-medium'>
                 <NavLink  onClick={()=>setShowMenu(false)} to='/' > <p  className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                  <NavLink   onClick={()=>setShowMenu(false)}to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                   <NavLink  onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                    <NavLink  onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
              </ul>
            </div>
           
           </div>

    </div>
  )
}

export default Navbar
