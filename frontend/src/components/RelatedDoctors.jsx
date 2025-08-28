import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RelatedDoctors({ speciality, docId }) {


const navigate = useNavigate()
const{doctors} = useContext(AppContext);
// Filter doctors based on the speciality and exclude the current doctor
const[relDoc,setRelDoc] = useState([]);

useEffect(() => {
 if(doctors.length >0 && speciality){
     const doctorsData = doctors.filter((doc) =>doc.speciality === speciality && doc._id !== docId)
     setRelDoc(doctorsData);
 }

}, [doctors, speciality, docId]);


  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10' >
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='text-center text-sm s,:w-1/3'>Simply browse through our extensive list of trusted doctors.</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.slice(0,5).map((item, index) => (
            <div onClick={() => navigate(`/appointment/${item._id};`)} key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 flex flex-col items-center">
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
        ))}
      
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 cursor-pointer rounded-full mt-10'>more</button>
    </div>
  )
}

export default RelatedDoctors
