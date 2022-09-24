const errorHandler = require("../../utils/errorHandler");
const Book = require("../../models/Book");

exports.getBook = async (req, res) => {
  try {
    const id = req.params.bookId;
    console.log(req.user);

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
      .populate("rating")
      .lean();

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
      data: {
        ...book,
        isHeldByMe:
          book?.heldBy && req?.user?._id
            ? book.heldBy.toString() === req.user._id.toString()
            : false,
        isMine: book?.owner?._id?.toString() === req?.user?._id,
      },
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
