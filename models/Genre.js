const { Schema } = require("mongoose");

const genreSchema = new Schema({
  name: {
    type: String,
    maxLength: 100,
  },
  slug: {
    type: String,
    maxLength: 100,
  },
  books: [],
});

genreSchema.pre("save", function (next) {
  this.slug = this.name.split(" ").join("-");
  next();
});

module.exports = mongoose.model("Genre", genreSchema);
