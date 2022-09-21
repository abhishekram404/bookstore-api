const Book = require("../../models/Book");
const errorHandler = require("../../utils/errorHandler");

exports.searchBook = async (req, res) => {
  try {
    const query = await req.query.q;
    if (!query) {
      return res.status(400).send({
        success: false,
        message: "Search query is required",
        data: null,
      });
    }
    const books = await Book.find({
      title: { $regex: query, $options: "i" },
    })
      .populate("genre", "name")
      .populate("owner", "fullName");

    res.status(200).json(books);
  } catch (error) {
    errorHandler({ error, res });
  }
};
