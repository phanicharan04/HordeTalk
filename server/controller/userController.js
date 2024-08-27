import user from "../model/User.js";
import bcrypt from "bcrypt";
import generateToken from "../config/token.js";
export const signUpUser=async(req,res)=>{
    try {
        const{fname,lname,username,age,email,password,mobile}=req.body
        // console.log(req.body)
        const isUserExisting=await user.findOne({email:email})
        if(isUserExisting){
            res.status(400).send("User Already Exists")
        }
        else{
            const newUser=await user.create({
                fname,
                lname,
                username,
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
    const {email,username,password}=req.body
    
    try {
        const curruser = await user.findOne({
            $or:[
                {email:email},
                {username:username}
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
                    username:curruser.username,
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