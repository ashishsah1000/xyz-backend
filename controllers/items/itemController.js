const passport = require("passport");

const items = require("../../models/items");

// insert a product
exports.createItem = async (req, res, next) => {
  console.log("req body", req.body);
  res.send("Product was recived");
};

// retrive all products
