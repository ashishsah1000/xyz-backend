const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  itemName: {
    type: String,
    required: [true, "Please provide item name"],
    maxlength: [50, "Character length exceded"],
  },
  itemCode: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: "Default",
  },
  price: {
    type: Number,
    required: [true, "Price nai doge toh kaam kaisa chlega"],
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    default: "a store item",
  },
});

module.exports = mongoose.model("item", itemSchema);
