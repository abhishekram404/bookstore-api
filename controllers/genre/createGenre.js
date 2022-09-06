const Genre = require("../../models/Genre");
const errorHandler = require("../../utils/errorHandler");

exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await Genre.create({ name });
    return res.status(200).send({
      success: true,
      message: "Genre created successfully",
      data: genre,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
