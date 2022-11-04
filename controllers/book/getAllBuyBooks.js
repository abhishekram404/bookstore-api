const BuyBook = require("../../models/BuyBook");
const errorHandler = require("../../utils/errorHandler");

exports.getAllBuyBooks = async (req, res) => {
  try {
    let buyBooksAggregation = await BuyBook.aggregate([
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
        buybooks: buyBooksAggregation,
      },
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
