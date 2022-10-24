const errorHandler = require("../../utils/errorHandler");
const Post = require("../../models/Post");

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id.toString());
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        errorHandler({ error, res });
      }
    } else {
      res.status(401).json("You can update only your posts");
    }
  } catch (error) {
    errorHandler({ error, res });
  }
};
