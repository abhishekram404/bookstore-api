const errorHandler = require("../../utils/errorHandler");
const Post = require("../../models/Post");
// const User = require("../../models/User");

exports.createPost = async (req, res) => {
  try {
    const {
      title,
      username,     
      description,    
      category,
    } = req.body;

 
    const post = await Post.create({
      title,
      username,  
      description,
      photo: req.file ? `/${req.file.path}` : null,    
      category,       
    });

    return res.status(200).json(post);
  } catch (error) {
    errorHandler({ error, res });
  }
};






// const errorHandler = require("../../utils/errorHandler");
// const Post = require("../../models/Post")

// exports.createPost = async (req, res) => {
//   const newPost = new Post(req.body);
//   try {
//     const savedPost = await newPost.save();
//     res.status(200).json(savedPost);
//   } catch (error) {
//     errorHandler({ error, res });
//   }
// };
 


