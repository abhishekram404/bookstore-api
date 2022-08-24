const User = require("../../models/User");
const errorHandler = require("../../utils/errorHandler");

// verify email
exports.verify = async (req, res) => {
  try {
    const { otp, email } = await req.body;

    if (!email || !otp) {
      return res.status(400).send({
        success: false,
        message: "Email and OTP both must be included.",
        data: null,
      });
    }
    const foundUser = await User.findOne({ email: email.trim() });

    if (!foundUser) {
      return res.status(400).send({
        success: false,
        message: "No user having the provided email was found.",
        data: null,
      });
    }

    if (foundUser.otp === otp) {
      foundUser.emailVerified = true;
      foundUser.otp = undefined;
      foundUser.save();
      return res.status(200).send({
        success: true,
        message: "Email verification successful.",
        data: null,
      });
    }

    return res.status(400).send({
      success: false,
      message: "OTP is not correct.",
      data: null,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
