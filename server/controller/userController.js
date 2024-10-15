import user from "../model/User.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import generateToken from "../config/token.js";
import { v2 as cloudinary } from 'cloudinary';

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
  
export const signUpUser=async(req,res)=>{
    try {
        const{fname,lname,bio,age,email,password,mobile}=req.body
        // console.log(req.body)
        const isUserExisting=await user.findOne({email:email})
        if(isUserExisting){
            res.status(400).send("User Already Exists")
        }
        else{
            const newUser=await user.create({
                fname,
                lname,
                age,
                email,
                password,
                mobile
            })
            if(newUser)
                res.status(201).json({
                _id:newUser._id,
                fname:newUser.fname
            })
             else
                throw new Error("Unable To Create User")
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}


export const loginUser = async (req,res)=>{
    const {email,password}=req.body
    
    try {
        const curruser = await user.findOne({
            $or:[
                {email:email}
            ]
        });
        
        if(!curruser){
            res.status(404).send("User Not Found")
        }
        else{
            const hashedpwd = curruser.password
            if(await bcrypt.compare(password,hashedpwd)){
                res.status(200).json({
                    _id:curruser._id,
                    email:curruser.email,
                    bio:curruser.bio,
                    name:curruser.fname+" "+curruser.lname,
                    token:generateToken(curruser?._id)
                })
            }
            else{
                res.status(401).send("Wrong Password")
            }
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const viewAllUsers=async(req,res)=>{
    const allusers = await user.find()
    res.status(200).send(allusers)
}

export const viewUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userProfile = await user.findById(userId);
        // console.log(userId);
        
        if (!userProfile) {
            return res.status(404).send("User Not Found");
        }

        res.status(200).json({
            _id: userProfile._id,
            fname: userProfile.fname,
            lname: userProfile.lname,
            bio: userProfile.bio,
            age: userProfile.age,
            email: userProfile.email,
            mobile: userProfile.mobile,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const viewProfile = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).send("User ID missing in request.");
        }
        
        const userProfile = await user.findById(userId);

        if (!userProfile) {
            return res.status(404).send("User Not Found");
        }

        res.status(200).json({
            _id: userProfile._id,
            fname: userProfile.fname,
            lname: userProfile.lname,
            bio: userProfile.bio,
            age: userProfile.age,
            email: userProfile.email,
            mobile: userProfile.mobile,
        });
    } catch (error) {
        console.error("Error in viewProfile:", error.message); // Log the error message
        res.status(500).send(error.message);
    }
};


export const updateProfile = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { fname, lname, bio, age, email, mobile } = req.body;
      
      const userToUpdate = await user.findById(userId);
      
      if (!userToUpdate) {
        return res.status(404).send("User Not Found");
      }
      
      let filters = {};
      filters.fname = fname || userToUpdate.fname;
      filters.lname = lname || userToUpdate.lname;
      filters.bio = bio || userToUpdate.bio;
      filters.age = age || userToUpdate.age;
      filters.email = email || userToUpdate.email;
      filters.mobile = mobile || userToUpdate.mobile;
      
      // If a profile picture is uploaded, upload it to Cloudinary
      if (req.files && req.files.dp) {
        const file = req.files.dp; // The uploaded profile picture
        const buffer = file.data; // Access the buffer from the file
        
        // Upload the buffer to Cloudinary
        cloudinary.config({
          cloud_name: cloudname,
          api_key: apikey,
          api_secret: apisecret,
        });
        
        const result = await uploadToCloudinary(buffer);
        filters.dp = result?.url || userToUpdate.dp; // Update dp with the Cloudinary URL
      }
      
      const updatedUser = await user.findByIdAndUpdate(userId, filters, { new: true });
      
      res.status(200).json({
        _id: updatedUser._id,
        fname: updatedUser.fname,
        lname: updatedUser.lname,
        bio: updatedUser.bio,
        age: updatedUser.age,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        dp: updatedUser.dp, // Return the updated dp URL
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

export const Networks = async (req, res) => {
    const { userId } = req.body;
    const newPostObject = await post.findByIdAndUpdate(
      postId,
      {
        $addToSet: { networks: userId },
      },
      {
        new: true,
      }
    ).populate("networks","-password")
    res.status(201).send(newPostObject)
  };