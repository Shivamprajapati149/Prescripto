import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();
  return (
    <div className="md:mx-10">
      <div className="flex flex-cols sm:grid-cols-[3fr_2fr_1fr] gap-14 my-10 mt-40 text-sm " >
        {/*Left Section */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p>
           Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
           
          </p>
        </div>
        {/*Center Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
            <li onClick={()=>{navigate('/');scrollTo(0,0);}}>Home</li>
            <li onClick={()=>{navigate('/about');scrollTo(0,0);}}>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        {/*Right Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600 '>
            <li>+0-000-000-000</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>
      {/*Bottom Section */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
