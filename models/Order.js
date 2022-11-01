const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,

    },
    phone: {
      type: String,
      required: true,

    },
    city: {
      type: String,
    },
    area: {
      type: String,
      required: true,
    },
    bookName: {
      type: String,
    },
    price: {
      type: String,
    }
    
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
