const User = require("../../models/User");
const errorHandler = require("../../utils/errorHandler");
const sendMail = require("../../utils/mail");

// resend email verification otp
exports.resendOTP = async (req, res) => {
  try {
    const { email } = await req.params;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email must be included.",
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

    if (foundUser.emailVerified) {
      return res.status(400).send({
        success: false,
        message: "Email is already verified.",
        data: null,
      });
    }

    foundUser.generateOTP();
    foundUser.save();

    sendMail({
      to: email,
      text: `Your verification OTP is ${foundUser.otp}`,
      subject: "Email verification",
    });

    return res.status(200).send({
      success: true,
      message: "OTP resent. Please check your email for OTP.",
      data: null,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
