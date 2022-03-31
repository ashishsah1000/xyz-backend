const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
    trim: true,
    maxlength: [100, "Please enter below 100 text"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter email"],
    trim: true,
  },
  password: {
    type: String,
    minlength: [5, "Please enter more than 5 length"],
  },
});

module.exports = mongoose.model("user", userSchema);
