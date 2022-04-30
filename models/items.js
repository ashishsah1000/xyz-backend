const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: [true, "username is missing"],
  //   unique: [true, "same username already exists"],
  // },
  // items: [
  //   {
  //     itemName: {
  //       type: String,
  //       required: [true, "Please provide item name"],
  //       maxlength: [50, "Character length exceded"],
  //     },
  //     itemCode: {
  //       type: String,
  //     },
  //     price: {
  //       type: Number,
  //       required: [true, "Price nai doge toh kaam kaisa chlega"],
  //     },
  //     createdOn: {
  //       type: Date,
  //       default: Date.now(),
  //     },
  //   },
  // ],
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
  price: {
    type: Number,
    required: [true, "Price nai doge toh kaam kaisa chlega"],
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("item", itemSchema);
