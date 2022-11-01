const Book = require("../../models/Book");
const BuyBook = require("../../models/BuyBook");
const errorHandler = require("../../utils/errorHandler");
const { Types } = require("mongoose");

exports.searchBook = async (req, res) => {
  try {
    const query = await req.query.q;
    const filters = await req.body;
    if (!query) {
      return res.status(400).send({
        success: false,
        message: "Search query is required",
        data: null,
      });
    }
    const books = await BuyBook.find({
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
      // .populate("owner", "fullName");

    res.status(200).json(books);
  } catch (error) {
    errorHandler({ error, res });
  }
};
