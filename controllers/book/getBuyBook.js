const errorHandler = require("../../utils/errorHandler");
const BuyBook = require("../../models/BuyBook");

exports.getBuyBook = async (req, res) => {
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

    const buyBook = await BuyBook.findById(id)
   
      .populate("genre", "name")
      .populate("wishlistUsers")
      .populate("rating")
      .lean();

    if (!buyBook) {
      return res.status(404).send({
        success: false,
        message: "The requested book was not found.",
        data: null,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Book details fetched successfully.",
      data: buyBook,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
