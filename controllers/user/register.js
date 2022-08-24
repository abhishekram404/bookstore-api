const User = require("../../models/User");
const errorHandler = require("../../utils/errorHandler");
const bcrypt = require("bcrypt");
const registerValidator = require("../../validators/registerValidator");
const sendMail = require("../../utils/mail");
const generateOTP = require("../../utils/generateOTP");

// register
exports.register = async (req, res) => {
  try {
    console.log(req.body);

    const { error, value } = registerValidator.validate(req.body);

    if (error) {
      return res.status(400).send({
        success: false,
        message: error.details[0].message,
        data: null,
      });
    }
    const { fullName, username, password, email, phone } = await value;

    const emailAlreadyExists = await User.exists({ email: email.trim() });
    if (emailAlreadyExists) {
      return res.status(400).send({
        success: false,
        message: "Email is already registered.",
        data: null,
      });
    }

    const usernameNotAvailable = await User.exists({
      username: username.trim(),
    });
    if (usernameNotAvailable) {
      return res.status(400).send({
        success: false,
        message: "Username is already taken.",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      email,
      phone,
      otp: generateOTP(),
    });

    await sendMail({
      to: email,
      text: `Your verification OTP is ${newUser.otp}`,
      subject: "Email verification",
    });

    return res.status(200).send({
      success: true,
      message: "Registration successful. Please check your email for OTP.",
      data: null,
    });
  } catch (error) {
    errorHandler({ error, res });
  }
};
