const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/generateOTP");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    unique: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: {
      unique: true,
    },
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  dob: {
    type: Date,
  },
  passwordResetRequested: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  otp: {
    type: Number,
  },
  books: [],
  rentedBooks: [],
  wishlist: [],
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      exp: Date.now() / 1000 + 60 * 60 * 24, // 24 hrs
    },
    process.env.JWT_SECRET
  );
};

userSchema.methods.generateOTP = generateOTP;

const User = mongoose.model("User", userSchema);

module.exports = User;
