const mongoose = require("mongoose");
const Genre = require("./Genre");
const { Schema } = mongoose;
const bookSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
  },
  author: {
    type: String,
  },
  publishedDate: {
    type: Date,
  },
  genre: {
    type: [
      {
        type: Genre.schema,
      },
    ],
  },
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
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);
