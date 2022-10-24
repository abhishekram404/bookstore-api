const errorHandler = require("../../utils/errorHandler");
const Post = require("../../models/Post");

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id.toString());
    if (post.username === req.body.username) {
      try {
        await post.delete();
        
        res.status(200).json("Post has been deleted");
      } catch (error) {
        errorHandler({ error, res });
      }
    } else {
      res.status(401).json("You can delete only your posts");
    }
  } catch (error) {
    errorHandler({ error, res });
  }
};
