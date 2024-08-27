import express from 'express';
import validateToken from '../middleware/authMiddleware.js';
import { addPost, deletePost, likePost, updatePost, viewAllPosts, viewPostById } from '../controller/postController.js';

const postRouter = express.Router();

postRouter.route("/addpost").post(validateToken,addPost)

postRouter.route("/likepost/:postId").post(validateToken,likePost)

postRouter.route("/updatepost/:postId").put(validateToken,updatePost)

postRouter.route("/findallposts").get(validateToken,viewAllPosts)

postRouter.route("/findpostbyid").get(validateToken,viewPostById)

postRouter.route("/deletepost/:postId").delete(validateToken,deletePost)

export default postRouter;

