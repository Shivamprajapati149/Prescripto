import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// ==================== REGISTER USER ====================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check missing details
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== LOGIN USER ====================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET PROFILE ====================

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel
      .findById(userId)
      .select("-password");

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      userData,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== UPDATE PROFILE ====================

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      birthday,
      gender,
    } = req.body;

    const userId = req.userId;
    const imageFile = req.file;

    if (!name || !phone || !birthday || !gender) {
      return res.json({
        success: false,
        message: "Missing details",
      });
    }

    const updateData = {
      name,
      phone,
      address: address || null,
      birthday,
      gender,
    };

    // Upload image
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        {
          resource_type: "image",
        }
      );

      updateData.image = imageUpload.secure_url;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      )
      .select("-password");

    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== BOOK APPOINTMENT ====================

const bookAppointment = async (req, res) => {
  try {
    console.log("========== BOOK APPOINTMENT CALLED ==========");
    const userId = req.userId;
    const {
      docId,
      slotDate,
      slotTime,
    } = req.body;

    console.log("userId:", userId);
    console.log("docId:", docId);
    console.log("slotDate:", slotDate);
    console.log("slotTime:", slotTime);

    // Validate request
    if (!userId || !docId || !slotDate || !slotTime) {
      return res.json({
        success: false,
        message: "Missing appointment details",
      });
    }

    // Find doctor
    const docData = await doctorModel
      .findById(docId)
      .select("-password");

    // IMPORTANT: Check doctor exists
    if (!docData) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Get booked slots
    let slots_booked = docData.slots_booked || {};

    // Check slot availability
    if (slots_booked[slotDate]) {

      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot not available",
        });
      }

      slots_booked[slotDate].push(slotTime);

    } else {

      slots_booked[slotDate] = [slotTime];

    }

    // Find user
    const userData = await userModel
      .findById(userId)
      .select("-password");

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Convert doctor document to normal object
    const appointmentDoctorData = docData.toObject();

    // Remove slots_booked from appointment data
    delete appointmentDoctorData.slots_booked;

    // Appointment data
    const appointmentData = {
      userId,
      docId,
      userData,
      docData: appointmentDoctorData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    // Create appointment
    const newAppointment =
      new appointmentModel(appointmentData);

    await newAppointment.save();

    // Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(
      docId,
      {
        slots_booked,
      }
    );

    res.json({
      success: true,
      message: "Appointment Booked",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== EXPORT ====================

export default registerUser;

export {
  loginUser,
  updateProfile,
  getProfile,
  bookAppointment,
};