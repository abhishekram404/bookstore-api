const errorHandler = require("../../utils/errorHandler");
const Book = require("../../models/Book");
const { Types } = require("mongoose");
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

    let bookAggregation = await Book.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
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
        $lookup: {
          from: "wishlists",
          localField: "_id",
          foreignField: "bookId",
          as: "wishlists",
        },
      },
      {
        $addFields: {
          rating: { $avg: "$bookRatings.rating" },
          isRatedByMe: {
            $in: [new Types.ObjectId(req?.user?._id), "$bookRatings.userId"],
          },
          myRating: {
            $arrayElemAt: [
              "$bookRatings.rating",
              {
                $indexOfArray: [
                  "$bookRatings.userId",
                  new Types.ObjectId(req?.user?._id),
                ],
              },
            ],
          },
          ratingsCount: { $size: "$bookRatings" },
          isHeldByMe: {
            $eq: [new Types.ObjectId(req?.user?._id), "$heldBy"],
          },
          isOwnedByMe: {
            $eq: [new Types.ObjectId(req?.user?._id), "$owner"],
          },
          isWishlistedByMe: {
            $in: [new Types.ObjectId(req?.user?._id), "$wishlists.userId"],
          },
        },
      },
      {
        $unset: ["bookRatings"],
      },
    ]);

    if (!bookAggregation || bookAggregation.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    // const book = await Book.findById(id)
    //   .populate("owner", "fullName")
    //   .populate("genre", "name")
    //   .populate("wishlistUsers")
    //   .populate("rating")
    //   .lean();

    let book = await Book.populate(bookAggregation[0], {
      path: "owner",
      select: "fullName",
    });
    book = await Book.populate(book, {
      path: "genre",
      select: "name",
    });

    return res.status(200).send({
      success: true,
      message: "Book details fetched successfully.",
      data: book,
      // {
      //   ...book,
      //   isHeldByMe:
      //     book?.heldBy && req?.user?._id
      //       ? book.heldBy.toString() === req.user._id.toString()
      //       : false,
      //   isMine: book?.owner?._id?.toString() === req?.user?._id,
      // },
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
