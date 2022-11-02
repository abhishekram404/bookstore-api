const errorHandler = require("../../utils/errorHandler");
const Rating = require("../../models/Rating");
const Book = require("../../models/Book");
exports.rateBook = async (req, res) => {
  try {
    const { user } = await req;
    if (!user || !user._id) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized request",
        data: null,
      });
    }
    const { _id: userId } = await user;
    const { rating, bookId } = await req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    const { owner } = await book;
    if (owner.toString() === userId.toString()) {
      return res.status(400).send({
        success: false,
        message: "You cannot rate your own book",
        data: null,
      });
    }

    const bookRating = await Rating.findOne({ book: bookId, user: userId });
    if (bookRating) {
      bookRating.rating = rating;
      await bookRating.save();
    } else {
      await Rating.create({
        rating,
        bookId,
        userId,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Book rated successfully",
      data: {
        book,
      },
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
