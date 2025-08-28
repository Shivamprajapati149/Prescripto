import validator from "validator";
import bycrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js"; // ✅ correct path
import appointmentModel from "../models/appointmentModel.js";








//make API for lofin user

const  registerUser = async (req, res) => {
    try{
        const{name,email,password}= req.body;
       
        if(!name,!email,!password){
            return res.json({success:false,message:"Missing Details"})
  }

  //valid email check
  if(!validator.isEmail(email)){
    return res.json({success:false,message:"Please enter a valid email"})
  }
    //valid password check
  if(password.length<8){
    return res.json({success:false,message:"Password must be at least 8 characters long"})

  }

  //hashewd password
  const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password,salt);

  //add in databse
  const userData ={
    name,
    email,
    password:hashedPassword,

  }
 

  //add userdata  in database

  const newUser = new userModel(userData);
  const user =await newUser.save();


 // create a token
const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
  res.json({success:true,token})

    }catch(error){
   console.log(error)
   res.json({success:false,message:error.message}) 
    }
  
}


//API for user login

const loginUser =async(req,res)=>{
try{
  const {email,password}= req.body
 //find user is exist or not
  const user  = await userModel.findOne({email});
  
  if(!user){
    res.json  ({success:false,message:"User not found"})

  }
  //now match password
  const isMatch = await bycrypt.compare(password,user.password);

 if(isMatch){
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
  res.json ({success:true,token})
 }else{
  res.json({success:false,message:"Invalid credentials"})
 }



}catch(error){
  console.log(error)
  res.json({success:false,message:error.message})

}

}

//API to get user profile data
const getProfile = async (req, res) => {
    try{
      const userId = req.userId
      const userData = await userModel.findById(userId).select("-password");
      res.json({success:true,userData})
      


    }catch(error){
      console.log(error)
  res.json({success:false,message:error.message})

    }
}

//API to update user profile
const updateProfile = async(req,res)=>{
  try {
    const {  name, phone, address, birthday, gender } = req.body;
   const userId = req.userId;

    const imageFile = req.file;

    if (!name || !phone || !birthday || !gender) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Prepare update object
    let updateData = {
      name,
      phone,
      address : address || null,
      birthday,
      gender
    };

   if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }
    


    // Update user in DB
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true, // return updated document
      runValidators: true
    }).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch(error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api for appointment data
// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

   

    let slots_booked = docData.slots_booked;

    // checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




export default registerUser;
export {loginUser}
export {updateProfile} 
export {getProfile}
export {bookAppointment}