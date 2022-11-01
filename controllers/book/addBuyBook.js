const errorHandler = require("../../utils/errorHandler");
const BuyBook = require("../../models/BuyBook");


exports.addBuyBook = async (req, res) => {
  try {

    const {
      title,
      author,
      description,
      //  cover,
      price,
      publishedDate,
      genre,
    } = req.body;

    // const { cover } = req.file;
    const buyBook = await BuyBook.create({
      title,
      author,
      description,
      cover: req.file ? `/${req.file.path}` : null,
      price,
      genre,
      publishedDate,
     
    });

    return res.status(201).send({
      success: true,
      message: "Book added successfully",
      data: {
        buyBook,
      },
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
