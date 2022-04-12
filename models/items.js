const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is missing"],
    unique: [true, "same username already exists"],
  },
  itemName: {
    type: String,
    required: [true, "Please provide item name"],
    maxlength: [50, "Character length exceded"],
  },
  itemCode: {
    type: String,
    unique: [true, "same ID already exists"],
  },
});

module.exports = mongoose.model("item", itemSchema);
