const Book = require("../../models/Book");
const User = require("../../models/User");
const errorHandler = require("../../utils/errorHandler");

exports.getMyBooks = async (req, res) => {
  try {
    const { user } = await req;
    const books = await Book.find({
      $or: [{ owner: user._id }, { heldBy: user._id }],
    });
    return res.status(200).send({
      success: true,
      message: "All books fetched successfully",
      data: {
        books,
      },
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
