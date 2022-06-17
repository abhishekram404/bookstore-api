const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
    const { fullName, username, password, email, phone, address } =
      await req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      email,
      phone,
      address,
    });

    return res.status(200).send({
      success: true,
      message: "User created",
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
