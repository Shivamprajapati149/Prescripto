import mongoose from "mongoose";

const connectDB = async() =>{
    //for database connection
mongoose.connection.on('connected',()=> console.log(("Database connectred")))

    await mongoose.connect( `${process.env.MONGODB_URL}/prescripto`)


}
export default connectDB