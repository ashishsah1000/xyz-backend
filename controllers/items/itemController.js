const passport = require("passport");

const items = require("../../models/items");

// insert a product
exports.createItem = async (req, res, next) => {
  if (req.user) {
    await items.findOne({ email: req.body.username }, async (err, doc) => {
      if (err) {
        console.log(err);
        return res.send("some err has occured");
      }
      if (doc) {
        doc.items.push(req.body.items[0]);
        await doc.save();
        return res.send("success");
      }
      if (!doc) {
        const createItem = items.create(req.body);
        return res.send("Item was created");
      }
    });
  } else {
    return res.send("authorization error");
  }

  res.send("Product was recived");
};

// retrive all products
exports.allItems = async (req, res, next) => {
  if (req.user) {
    items.find((err, doc) => {
      if (err) {
        console.log(err);
        res.send("there has been error on the server");
      } else {
        console.log(doc);
        res.send(doc);
      }
    });
  } else
    res.send({
      success: false,
      error: "autherization error",
    });
};

//  delete a product

exports.deleteProduct = async (req, res, next) => {
  if(req.user){
    await items.deleteOne( {_id:req.body._id})
    res.status(200).send("deleted")
  }
  else{
    res.status(401).send("unauthorized");
  }
}