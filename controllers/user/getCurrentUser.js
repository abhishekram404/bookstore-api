const User = require("../../models/User");
const errorHandler = require("../../utils/errorHandler");
const mongoose = require("mongoose");

exports.getCurrentUser = async (req, res) => {
  try {
    const { user } = await req;

    const currentUser = await User.findOne({
      _id: mongoose.Types.ObjectId(user._id.toString()),
    }).select("-emailVerified -passwordResetRequested -otp");

    if (!currentUser) {
      return res.status(400).send({
        success: false,
        message: "The requested user was not found.",
        data: null,
      });
    }

    return res.status(200).send({
      success: true,
      message: "User was found.",
      data: currentUser,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
