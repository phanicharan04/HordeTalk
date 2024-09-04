import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        "title" : String,
        "desc" : String,
        "postImage":String,
        "authorId": {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        likedBy: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User', // Referencing the User model
          }]
    },
    {timestamps:true}
)


// postSchema.pre("findOneAndUpdate",function(next){
//     const modified=this.likedBy?.map((item)=>{
//         return item
//     })
//     this.likedBy=[...new Set(modified)]
//     next();
// })

const post = mongoose.model("Post",postSchema)

export default post;