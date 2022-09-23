const errorHandler = require("../../utils/errorHandler");
const Book = require("../../models/Book");

exports.getBook = async (req, res) => {
  try {
    const id = req.params.bookId;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "bookId is missing.",
        data: null,
      });
    }

    const book = await Book.findById(id)
      .populate("owner", "fullName")
      .populate("genre", "name")
      .populate("wishlistUsers")
      .populate("rating");

    if (!book) {
      return res.status(404).send({
        success: false,
        message: "The requested book was not found.",
        data: null,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Book details fetched successfully.",
      data: book,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
