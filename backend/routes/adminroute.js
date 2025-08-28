import express from 'express'
import { addDoctor,loginAdmin,getAllDoctors } from '../controllers/adminController.js'
import authAdmin from '../middlewares/authadmin.js'
import  changeAvailablity  from '../controllers/doctorController.js'

 

// Create a new router instance
const adminRouter = express.Router()
// Define the route for adding a doctor

adminRouter.post('/add-doctor',authAdmin, addDoctor)

// Define the route for admin login
adminRouter.post('/login', loginAdmin)

//define the route for getalldoctors
adminRouter.post('/all-doctors',authAdmin,getAllDoctors)
  
//api for check availability
adminRouter.post('/change-availability',authAdmin, changeAvailablity)


export default adminRouter