const { Schema } = require("mongoose");
const Genre = require("./Genre");
const bookSchema = new Schema({
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
    type: [Genre],
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

export default mongoose.model("Book", bookSchema);
