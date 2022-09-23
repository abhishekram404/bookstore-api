const errorHandler = require("../../utils/errorHandler");
const Book = require("../../models/Book");
const User = require("../../models/User");

exports.addBook = async (req, res) => {
  try {
    const { user } = await req;
    const {
      title,
      author,
      description,
      //  cover,
      price,
      publishedDate,
      genre,
    } = req.body;

    // const { cover } = req.file;
    const book = await Book.create({
      title,
      author,
      description,
      cover: req.file ? `/${req.file.path}` : null,
      price,
      genre,
      publishedDate,
      owner: user._id,
    });

    await User.findByIdAndUpdate(user._id, {
      $push: { books: book._id },
    });

    return res.status(201).send({
      success: true,
      message: "Book added successfully",
      data: {
        book,
      },
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
