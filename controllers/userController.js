const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const registerValidator = require("../validators/registerValidator");
const sendMail = require("../utils/mail");
// fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    sendMail({
      to: "ramabishek40@gmail.com",
      text: "Hello abhishek",
      subject: "Test email",
    });
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
    });

    return res.status(200).send({
      success: true,
      message: "User created",
      data: null,
    });
  } catch (error) {
    console.log(error);
    errorHandler({ error, res });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = await req.body;

    const foundUser = await User.findOne({ email }).select(
      "email password role"
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
