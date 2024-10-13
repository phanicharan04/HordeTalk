import post from "../model/Post.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config()
const cloudname=process.env.CLOUD_NAME
const apikey=process.env.API_KEY
const apisecret=process.env.API_SECRET

const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return reject(error);
      }
      
      resolve(result);
    });
    stream.end(buffer);
  });
};

export const addPost = async (req, res) => {
  // const { title, desc, uId } = req.body;
  let {body}=req.body
  body=JSON.parse(body)
  console.log(body);
  
  const { title, desc, uId }=body
  let result="";

  try {
    if (req.files) {
      const file = req.files.image; // The uploaded file
      const buffer = file.data; // Access the buffer from the file
  
      // Upload the buffer to Cloudinary
  
      cloudinary.config({
        cloud_name: cloudname,
        api_key: apikey,
        api_secret: apisecret,
      });
  
       result = await uploadToCloudinary(buffer);
      
    }
    const newPost = await post.create({
      title,
      desc,
      authorId: uId,
      postImage:result?.url || ""
    });
    res.status(201).send(newPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  const newPostObject = await post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { likedBy: userId },
    },
    {
      new: true,
    }
  ).populate("likedBy","-password")
  res.status(201).send(newPostObject)
};

export const updatePost = async (req, res) => {
    const {postId} = req.params;
    const {desc} = req.body;
    const newPostObject = await post.findByIdAndUpdate(
        postId,{
            desc:desc
        },
        {
            new : true,
        }
    )
    res.status(201).send(newPostObject)
}

export const viewAllPosts = async (req, res) => {
    const allposts = await post.find().populate("authorId").populate("likedBy")
    res.status(200).send(allposts)
}

export const viewPostById = async (req, res) => {
    const {postId}=req.query
    try {
        const currpost = await post.findById(postId)
        res.status(200).send(currpost)
    } catch (error) {
        res.status(404).send(error.message)
    }

}

export const viewPostByAuthor = async (req, res) => {
  const {authorId}=req.params
  
  try {
      const currpost = await post.find({authorId:authorId})
      res.status(200).send(currpost)
  } catch (error) {
      res.status(404).send(error.message)
  }

}

export const deletePost = async (req, res) =>{
    const {postId} = req.params;
    await post.deleteOne({_id:postId})
    res.status(200).send("Post Deleted Successfully...!")
}



export const uploadImg = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    console.log(req);
    
    const file = req.files.image; // The uploaded file
    const buffer = file.data; // Access the buffer from the file

    // Upload the buffer to Cloudinary

    cloudinary.config({
      cloud_name: "dnrcizmkk",
      api_key: "564648445716745",
      api_secret: "eVw1EB_fS3V6UzDh8yuM2eNoqCA",
    });

    const result = await uploadToCloudinary(buffer);

    res.json({ url: result.secure_url }); // Send back the Cloudinary URL
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

