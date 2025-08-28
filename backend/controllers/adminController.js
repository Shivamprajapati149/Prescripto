import validator from 'validator';
import bcrypt from 'bcrypt';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import connectCloudinary from '../config/cloudinary.js';


import cloudinary from 'cloudinary';


// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address,image } = req.body;
  
  
    
     // Validate required fields
     if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ message: "Password must be at least 8 characters long" });
    }

         // Upload Base64 image to Cloudinary
    const imageUrl = await cloudinary.v2.uploader.upload(image, {
      folder: 'doctors',
      resource_type: 'image'
    });


    //for hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      image: imageUrl.secure_url,
      address,
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully" });

    

  
   
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in adding doctor" });
  }
};

//api for admin login
const loginAdmin = async(req,res)=>{
  try{
    const {email,password}=req.body
  // AGAR EMAIL PASSWOR MATCH HUA TO TOKEN GENERATE KREGE OR LOGIN KRAYEGE
    if (email===process.env.ADMIN_EMAIL&& password===process.env.ADMIN_PASSWORD ) {
       const token =jwt.sign(email+password,process.env.JWT_SECRET)
       res.json({success:true ,  token})
      }else{
      res.json  ({success:false, message:"Invalid email or password"})
    }
    

  }catch(error){
    console.log(error)
    res.json({sucess:false, message:"Error in admin login"})  
  }
 

}
//API  for get all doctora from admin panel
const getAllDoctors = async (req, res) => {
  try{
     const doctors = await doctorModel.find().select('-password');
     res.json({success:true, doctors})

  }catch(error){
    console.log(error);
    res.status(500).json({success:false, message:"Error in getting all doctors"})
  }
}



export { addDoctor, loginAdmin, getAllDoctors };