const Genre = require("../../models/Genre");
const errorHandler = require("../../utils/errorHandler");

exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.split(" ").join("-");
    const alreadyExists = await Genre.exists({
      slug,
    });

    if (alreadyExists) {
      return res.status(400).send({
        success: false,
        message: `Genre with name ${name} already exists.`,
        data: null,
      });
    }

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
