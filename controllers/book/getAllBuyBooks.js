const BuyBook = require("../../models/BuyBook");
const errorHandler = require("../../utils/errorHandler");

exports.getAllBuyBooks = async (req, res) => {
  try {
    const buybooks = await BuyBook.find();
    return res.status(200).send({
      success: true,
      message: "All books fetched successfully",
      data: {
        buybooks,
      },
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
