const mongoose = require("mongoose");
const Genre = require("./Genre");
const { Schema } = mongoose;
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    cover: {
      type: String,
    },
    description: {
      type: String,
    },
    rating: [{ userId: Schema.Types.ObjectId, rating: Number }],
    author: {
      type: String,
    },
    publishedDate: {
      type: Date,
    },
    genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    heldBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    wishlistUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
