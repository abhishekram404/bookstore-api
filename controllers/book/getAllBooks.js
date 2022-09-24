const Book = require("../../models/Book");
const errorHandler = require("../../utils/errorHandler");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({
      heldBy: null,
      owner: { $ne: req?.user?._id },
    }).sort({ createdAt: -1 });
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
