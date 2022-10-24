const errorHandler = require("../../utils/errorHandler");
const Category = require("../../models/Category");

exports.getAllCategories = async (req, res) => {
  try {
    const cats = await Category.find();
    return res.status(200).json(cats);
  } catch (error) {
    errorHandler({ error, res });
  }
};
