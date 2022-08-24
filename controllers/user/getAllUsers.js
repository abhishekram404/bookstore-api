const User = require("../../models/User");
const errorHandler = require("../../utils/errorHandler");

// fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({
      success: true,
      message: "All users fetched successfully",
      data: {
        users,
      },
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
