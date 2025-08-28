import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import adminRouter from './routes/adminroute.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import connectCloudinary from './config/cloudinary.js';
 import doctorRouter from './routes/doctorroute.js';
 import userRouter from './routes/userroute.js';





//appconfig
const app= express()
const port = process.env.PORT ||4000
connectDB()
connectCloudinary()



//middelwares
app.use(express.json({limit:'50mb'})); //json parse karega
app.use(cors());






//api endpoints
//localhost:4000/api/admin/add-doctor
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)







app.get('/',(req,res)=>{
    res.send('Welcome to Prescripto API ')

})

app.listen(port,()=> console.log("server started",port))