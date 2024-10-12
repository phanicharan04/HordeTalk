import express from 'express';
import { signUpUser, loginUser, viewAllUsers, viewUserById } from '../controller/userController.js';
import validateToken from '../middleware/authMiddleware.js';

const userRouter=express.Router();

userRouter.route("/signup").post(signUpUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/viewallusers").get(validateToken, viewAllUsers)
userRouter.route("/viewuser/:userId").get(validateToken,viewUserById)

export default userRouter;
