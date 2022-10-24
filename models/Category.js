const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      maxLength: 100,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },

  {
    timestamps: true,
  }
);

categorySchema.pre("save", function (next) {
  this.slug = this.name.split(" ").join("-");
  next();
});

module.exports = mongoose.model("Category", categorySchema);
