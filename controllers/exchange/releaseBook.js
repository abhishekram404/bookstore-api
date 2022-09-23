const Book = require("../../models/Book");
const User = require("../../models/User");
const errorHandler = require("../../utils/errorHandler");

exports.releaseBook = async (req, res) => {
  try {
    const { bookId } = await req.body;
    const holder = await User.findById(req.user._id);
    const book = await Book.findById(bookId);
    await book.updateOne({
      $unset: {
        heldBy: "",
      },
    });
    await holder.updateOne({
      $pull: {
        heldBooks: bookId,
      },
    });

    res.status(200).send({
      success: true,
      message: "Book released successfully",
      data: null,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
