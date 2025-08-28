import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';

const Doctors = () => {

const navigate = useNavigate()
const {speciality} = useParams()    // Get the speciality from the URL parameters
// State to hold filtered doctors
const [filterDoc, setfilterDoc] = useState([]) //array to hold filtered doctors
//context to get doctors data
const [showFilter, setShowFilter] = useState(false)
const {doctors} = useContext(AppContext)


// Function to apply filter based on speciality
const applyFilter =()=> {
  // If speciality is provided, filter doctors by speciality
  // Otherwise, set filterDoc to all doctors
  if(speciality) {
    setfilterDoc(doctors.filter(doc => doc.speciality === speciality))
  } else{
    setfilterDoc(doctors)
  }
}
 
// useEffect to apply filter when doctors or speciality changes
// This ensures that the filter is applied whenever the doctors data or speciality changes
 useEffect (() => {
  applyFilter()
}, [ doctors , speciality])

 return (
    <div>
      <p className='text-gray-600 '>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={` ${showFilter ? 'bg-[#5f6FFF] text-white':'' }   py-1 px-3 border rounded text-sm transition-all sm:hidden`} onClick={()=> setShowFilter(prev =>! prev)} >Filters</button>
        <div className={` ${showFilter ? 'flex': 'hidden sm:flex'} flex flex-col gap-4 text-sm text-gray-600 `}>
        <p onClick={()=> speciality=== 'General physician' ? navigate('/doctors'): navigate('/doctors/General physician')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black": "" }`}>General physician</p>
        <p onClick={()=> speciality=== 'Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality ==="Gynecologist" ? "bg-indigo-100 text-black": "" } `}>Gynecologist</p>
        <p onClick={()=> speciality=== 'Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality ==="Dermatologist" ? "bg-indigo-100 text-black": "" }`}>Dermatologist</p>
        <p onClick={()=> speciality=== 'Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality ==="Pediatricians" ? "bg-indigo-100 text-black": "" }`}>Pediatricians</p>
        <p onClick={()=> speciality=== 'Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality ==="Neurologist" ? "bg-indigo-100 text-black": "" }`}>Neurologist</p>
        <p onClick={()=> speciality=== 'Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality ==="Gastroenterologist" ? "bg-indigo-100 text-black": "" }`}>Gastroenterologist</p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {
            filterDoc.map((item, index) => (
            <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 flex flex-col items-center">
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4 w-full">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                  Available
                </div>
                <div>
                  <p className='font-medium text-gray-900 text-lg'>{item.name}</p>
                  <p className='font-sm text-gray-600 '>{item.speciality}</p>
                </div>
              </div>
            </div>
        ))

          }
        </div>
       
    </div>
    </div>
  )
}

export default Doctors
