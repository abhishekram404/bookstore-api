const errorHandler = require("../../utils/errorHandler");
const WishList = require("../../models/WishList");

exports.addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;

    const { _id: userId } = req.user;

    const wishList = await WishList.findOne({ bookId, userId });
    if (wishList) {
      wishList.remove();
      return res.status(200).send({
        success: true,
        message: "Book removed from wishlist.",
        data: null,
      });
    } else {
      await WishList.create({ bookId, userId });
      return res.status(200).send({
        success: true,
        message: "Book added to wishlist.",
        data: null,
      });
    }
  } catch (error) {
    errorHandler({ error, res });
  }
};
