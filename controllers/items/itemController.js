const passport = require("passport");

const items = require("../../models/items");

// insert a product
exports.createItem = async (req, res, next) => {
  if (req.user) {
    await items.findOne({ itemCode: req.body.itemCode }, (err, doc) => {
      if (err) {
        console.log(err);
        res.send("some err has occured");
      }
      if (doc) res.send("item already exist");
      if (!doc) {
        const createItem = items.create(req.body);
        res.send("Item was created");
      }
    });
  } else {
    res.send("authorization error");
  }

  res.send("Product was recived");
};

// retrive all products
