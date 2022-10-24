const errorHandler = require("../../utils/errorHandler");
const Post = require("../../models/Post");

exports.getAllPosts = async (req, res) => {
  const userName = await req.query.user;
  const catName = await req.query.cat;
  try {
    let posts;
    if (userName) {
      posts = await Post.find({ username: userName }).populate("category","name");
    } else if (catName) {
      posts = await Post.find({ category: catName }).populate("category","name");
    } else {
      posts = await Post.find().populate("category","name");
    }
    res.status(200).json(posts);
  } catch (error) {
    errorHandler({ error, res });
  }
};
