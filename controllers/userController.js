const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const registerValidator = require("../validators/registerValidator");
const sendMail = require("../utils/mail");
const generateOTP = require("../utils/generateOTP");

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

    foundUser.generateOTP();
    foundUser.save();

    await sendMail({
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
