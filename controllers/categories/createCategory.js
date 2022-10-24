const errorHandler = require("../../utils/errorHandler");
const Category = require("../../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.split(" ").join("-");
    const alreadyExists = await Category.exists({
      slug,
    });

    if (alreadyExists) {
      return res.status(400).send({
        success: false,
        message: `Category with name ${name} already exists.`,
        data: null,
      });
    }

    const category = await Category.create({ name });
    return res.status(200).send({
      success: true,
      message: "Category created successfully.",
      data: category,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
