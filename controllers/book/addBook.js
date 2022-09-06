const errorHandler = require("../../utils/errorHandler");
const Book = require("../../models/Book");

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
    const { cover } = req.file;
    const book = await Book.create({
      title,
      author,
      description,
      cover,
      price,
      genre,
      publishedDate,
      owner: user._id,
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
