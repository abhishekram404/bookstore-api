const Exchange = require("../../models/Exchange");
const User = require("../../models/User");
const Book = require("../../models/Book");
const errorHandler = require("../../utils/errorHandler");

exports.exchangeBook = async (req, res) => {
  try {
    const { bookId } = await req.body;
    const user = await User.findById(req.user._id);
    if (user.heldBooks.includes(bookId)) {
      return res.status(400).send({
        success: false,
        message:
          "You are already holding this book. Please release the book first in order to exchange it again.",
        data: null,
      });
    }

    if (user.books.includes(bookId)) {
      return res.status(400).send({
        success: false,
        message: "You can't exchange your own book",
        data: null,
      });
    }

    const exchangeTokenCount = await user.getExchangeTokenCount();
    if (exchangeTokenCount <= 0) {
      return res.status(400).send({
        success: false,
        message:
          "You don't have enough Exchange Tokens. Add a book to earn exchange tokens.",
        data: null,
      });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(400).send({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    const exchange = await Exchange.create({
      book: book._id,
      owner: book.owner,
      holder: user._id,
      date: new Date().toUTCString(),
    });

    await book.updateOne({
      $set: {
        heldBy: user._id,
      },
    });

    await user.updateOne({
      $push: {
        heldBooks: book._id,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Book exchanged successfully",
      data: exchange,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
