const User = require("../../models/User");
const errorHandler = require("../../utils/errorHandler");
const mongoose = require("mongoose");

exports.getUser = async (req, res) => {
  try {
    const user = await User.find({
      _id: mongoose.Types.ObjectId(req.params.userId.toString()),
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "The requested user was not found.",
        data: null,
      });
    }

    return res.status(200).send({
      success: true,
      message: "User was found.",
      data: user,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
