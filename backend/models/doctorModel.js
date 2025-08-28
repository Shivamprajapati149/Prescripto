import mongoose from "mongoose";

const doctorschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
     image: { type: String, required: true },
   
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true }, // या Number, जैसा आपके data में है
    address: {
      // ✅ nested object
      address1: { type: String, required: true },
     address2: { type: String, required: true }
     
    }, // या object, जैसा आपके data में है
    date: { type: Date, default: Date.now },
    slots_booked: { type: Object, default: {} },
  },
  { minimize: false }
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorschema);

export default doctorModel;
