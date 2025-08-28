import express from "express";
import  registerUser, { getProfile } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import { bookAppointment } from "../controllers/userController.js";
import { updateProfile } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
const userRouter = express.Router();
import Upload from "../middlewares/multer.js";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile",authUser,getProfile )

userRouter.post("/update",Upload.single("image"),authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);

export default userRouter;