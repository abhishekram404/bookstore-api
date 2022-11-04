const Book = require("../../models/Book");
const errorHandler = require("../../utils/errorHandler");
const { Types } = require("mongoose");

exports.getAllBooks = async (req, res) => {
  try {
    let booksAggregation = await Book.aggregate([
      {
        $match: {
          // not equal
          heldBy: null,
          owner: { $ne: new Types.ObjectId(req?.user?._id) },
        },
      },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "bookId",
          as: "bookRatings",
        },
      },
      {
        $addFields: {
          rating: { $avg: "$bookRatings.rating" },
        },
      },
      {
        $unset: ["bookRatings"],
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return res.status(200).send({
      success: true,
      message: "All books fetched successfully",
      data: {
        books: booksAggregation,
      },
    });
  } catch (error) {
    console.log(error);
    errorHandler({ error, res });
  }
};
