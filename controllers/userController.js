const { findById } = require("../models/users");
const User = require("../models/users");

// this is the test route for users

exports.userCheck = (req, res, next) => {
  res.status(200).json({
    success: true,
  });
};

// create new product

exports.newUser = async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
  });
};

// find the user

exports.findUser = async (req, res, next) => {
  const user = await findById(req.params.id).catch((err) => {
    console.log(err);
  });
  if (!user) {
    res.status(201).json({
      success: false,
    });
  }
  res.status(201).json({
    success: true,
  });
};
