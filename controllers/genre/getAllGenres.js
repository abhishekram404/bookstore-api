const Genre = require("../../models/Genre");
const errorHandler = require("../../utils/errorHandler");

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    return res.status(200).send({
      success: true,
      message: "All genres retrieved successfully",
      data: genres,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
