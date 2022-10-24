const errorHandler = require("../../utils/errorHandler");
const Post = require("../../models/Post");

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id.toString()).populate("category","name");
    res.status(200).json(post);
  } catch (error) {
    errorHandler({ error, res });
  }
};
