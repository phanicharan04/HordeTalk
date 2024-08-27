import post from "../model/Post.js";

export const addPost = async (req, res) => {
  const { title, desc, uId } = req.body;
  try {
    const newPost = await post.create({
      title,
      desc,
      authorId: uId,
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
    const allposts = await post.find()
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

export const deletePost = async (req, res) =>{
    const {postId} = req.params;
    await post.deleteOne({_id:postId})
    res.status(200).send("Post Deleted Successfully...!")
}