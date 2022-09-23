const mongoose = require("mongoose");

const ExchangeSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  holder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Exchange = mongoose.model("Exchange", ExchangeSchema);

module.exports = Exchange;
