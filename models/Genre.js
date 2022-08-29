const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 100,
  },
  slug: {
    type: String,
    maxLength: 100,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

genreSchema.pre("save", function (next) {
  this.slug = this.name.split(" ").join("-");
  next();
});

module.exports = mongoose.model("Genre", genreSchema);
