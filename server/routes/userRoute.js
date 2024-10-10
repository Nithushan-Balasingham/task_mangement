import express from "express";
import { userDataValidation } from "../middleware/dataValidation.js";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/api/register",userDataValidation, registerUser)
userRouter.post("/api/auth", loginUser)
userRouter.post("/api/logout", logoutUser)

export default userRouter