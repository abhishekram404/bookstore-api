const Book = require("../../models/Book");
const errorHandler = require("../../utils/errorHandler");
const { Types } = require("mongoose");

exports.searchBook = async (req, res) => {
  try {
    const query = await req.query.q;
    const filters = await req.body;
    console.log("filters", filters);
    if (!query) {
      return res.status(400).send({
        success: false,
        message: "Search query is required",
        data: null,
      });
    }
    const books = await Book.find({
      title: { $regex: query, $options: "i" },
      ...(filters.genre && {
        genre: {
          $in: filters.genre,
        },
      }),
      price: {
        $gte: filters.minPrice || 0,
        ...(filters.maxPrice && { $lte: filters.maxPrice }),
      },
    })
      .populate("genre", "name")
      .populate("owner", "fullName");

    console.log(books);
    res.status(200).json(books);
  } catch (error) {
    errorHandler({ error, res });
  }
};
