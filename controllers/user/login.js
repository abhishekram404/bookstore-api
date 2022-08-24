const User = require("../../models/User");
const errorHandler = require("../../utils/errorHandler");
const bcrypt = require("bcrypt");
const sendMail = require("../../utils/mail");

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = await req.body;

    const foundUser = await User.findOne({ email }).select(
      "email password role emailVerified otp"
    );
    if (!foundUser) {
      return res
        .status(400)
        .send({ success: false, message: "User does not exist.", data: null });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .send({ success: false, message: "Wrong password.", data: null });
    }

    if (!foundUser.emailVerified) {
      foundUser.generateOTP();
      foundUser.save();
      await sendMail({
        to: email,
        text: `Your verification OTP is ${foundUser.otp}`,
        subject: "Email verification",
      });
      return res.status(400).send({
        success: false,
        message:
          "Please verify your email first. We sent you an OTP in your email.",
        data: null,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Login successful",
      data: {
        token: foundUser.generateToken(),
      },
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
