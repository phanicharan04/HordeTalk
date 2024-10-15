import express from 'express';
import validateToken from '../middleware/authMiddleware.js';
import { addPost, deletePost, likePost, updatePost, uploadImg, viewAllPosts, viewPostByAuthor, viewPostById } from '../controller/postController.js';

const postRouter = express.Router();

postRouter.route("/addpost").post(validateToken,addPost)

postRouter.route("/likepost/:postId").post(validateToken,likePost)

postRouter.route("/updatepost/:postId").put(validateToken,updatePost)

postRouter.route("/findallposts").get(validateToken,viewAllPosts)

postRouter.route("/findpostbyid/:postId").get(validateToken,viewPostById) 

postRouter.route("/mypost/:authorId").get(validateToken,viewPostByAuthor)       

postRouter.route("/deletepost/:postId").delete(validateToken,deletePost)

postRouter.route("/uploadimg").post(uploadImg)

export default postRouter;

