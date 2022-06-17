const mongoose = require("mongoose");

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
  passwordResetRequested: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  books: [],
  rentedBooks: [],
  wishlist: [],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
