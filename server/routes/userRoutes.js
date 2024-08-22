import express from 'express';
import { signUpUser, loginUser } from '../controller/userController.js';

const userRouter=express.Router();

userRouter.route("/signup").post(signUpUser)
userRouter.route("/login").post(loginUser)

export default userRouter;
