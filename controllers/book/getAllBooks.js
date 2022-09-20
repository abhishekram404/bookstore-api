const Book = require("../../models/Book");
const User = require("../../models/User");
const errorHandler = require("../../utils/errorHandler");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
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
