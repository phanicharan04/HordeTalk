import express from 'express';
import validateToken from '../middleware/authMiddleware.js';
import { addPost, deletePost, likePost, updatePost, uploadImg, viewAllPosts, viewPostByAuthor, viewPostById } from '../controller/postController.js';

const postRouter = express.Router();

postRouter.route("/addpost").post(addPost)  //add validate token later here

postRouter.route("/likepost/:postId").post(validateToken,likePost)

postRouter.route("/updatepost/:postId").put(validateToken,updatePost)

postRouter.route("/findallposts").get(viewAllPosts)   //add validate token later here

postRouter.route("/findpostbyid").get(validateToken,viewPostById)

postRouter.route("/mypost/:authorId").get(viewPostByAuthor)       //add validate token later here

postRouter.route("/deletepost/:postId").delete(validateToken,deletePost)

postRouter.route("/uploadimg").post(uploadImg)

export default postRouter;

