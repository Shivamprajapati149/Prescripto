import React, { useContext } from 'react'
import Login from './pages/Login.jsx'
import { AdminContext } from './context/AdminContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route,Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllApointments from './pages/Admin/AllApointments.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorList from './pages/Admin/DoctorList.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
const App = () => {
const {aToken} = useContext(AdminContext)


  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start '>
        <Sidebar/>
        <Routes>
            <Route path='/' element ={<></>}/>
            <Route path='/admin-dashboard' element ={<Dashboard/>}/>
            <Route path='/admin-appointments' element ={<AllApointments/>}/>
            <Route path='/admin-add_doctor' element ={<AddDoctor/>}/>
            <Route path='/admin-doctor_list' element ={<DoctorList/>}/>
        </Routes>
      </div>
      
    </div>
  ) : (
    <>
       <Login/>
        <ToastContainer/>

    </>
  )
}

export default App
