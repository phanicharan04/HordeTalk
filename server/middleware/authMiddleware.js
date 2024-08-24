import jwt from 'jsonwebtoken';
import user from '../model/User.js';

const validateToken = async (req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            let token = req.headers.authorization.split(" ")[1]
            
            const jwt_secret = process.env.JWT_SECRET
            const decoded = jwt.verify(token, jwt_secret)
            
            req.user = await user.findById(decoded?._id).select("-password")
            next()
        } catch (error) {
            res.status(401).send(error.message)
        }
    }
    else{
        res.status(403).send("Authorization failed")
    }
}

export default validateToken