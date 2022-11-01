const mongoose = require("mongoose");
const { Schema } = mongoose;
const buyBookSchema = new mongoose.Schema(
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

module.exports = mongoose.model("BuyBook", buyBookSchema);
