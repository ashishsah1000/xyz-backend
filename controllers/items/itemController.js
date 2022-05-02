const passport = require("passport");
const Mongoose = require("mongoose");
const Item = require("../../models/items");

// insert a product
exports.createItem = async (req, res, next) => {
  if (req.user) {
    await Item.findOne({
      user_id: req.body.user_id,
      itemCode: req.body.item.itemCode,
    })
      .then(async (doc) => {
        if (doc) {
          console.log("itemCode is already used for another product");
          return res.send("itemCode is already used for another product");
        }
        const item = new Item({ ...req.body.item, user_id: req.body.user_id });
        await item
          .save()
          .then((it) => {
            console.log("item saved", it);
            return res.send("success");
          })
          .catch((err) => {
            console.log("error saving item", err);
            return res.send("error saving item " + err);
          });
      })
      .catch((err) => {
        console.log("error creating item");
        return res.send("error creating item");
      });
    // await items.findOne({ username: req.body.username }, async (err, doc) => {
    //   if (err) {
    //     console.log(err);
    //     return res.send("some err has occured");
    //   }
    //   if (doc) {
    //     doc.items.push(req.body.items[0]);
    //     await doc.save();
    //     return res.send("success");
    //   }
    //   if (!doc) {
    //     const createItem = items.create(req.body);
    //     return res.send("Item was created");
    //   }
    // });
  } else {
    return res.send("authorization error");
  }

  // res.send("Product was recived");
};

// retrive all products
exports.allItems = async (req, res, next) => {
  console.log(
    "🚀 ~ file: itemController.js ~ line 58 ~ exports.allItems= ~ req.user",
    req.user
  );
  if (req.user) {
    // console.log(req.user[0].email);
    // items.findOne({username:req.user[0].email},(err, doc) => {
    Item.find({ user_id: req.user[0]._id })
      .lean()
      .exec((err, docs) => {
        console.log(
          "🚀 ~ file: itemController.js ~ line 65 ~ Item.find ~ docs",
          docs
        );
        if (err) {
          console.log(err);
          res.send("there has been error on the server");
        }
        if (docs.length > 0) {
          console.log("sending docs", docs);
          return res.send(docs);
        } else {
          res.send("no doc");
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
  if (req.user) {
    console.log(req.body);
    Item.find({ user_id: req.body.user_id, _id: req.body._id }).exec(
      async (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(200).send("some error happened");
        }
        if (!doc) {
          return res
            .status(200)
            .send("doc may not be associated with user or doc doesn't exists.");
        }
        if (doc) {
          // console.log(`new ObjectId("${req.body._id}")`);
          // const data = docs[0].items.filter(
          //   (item) => item._id != Mongoose.Types.ObjectId(req.body._id)
          // );
          await Item.findByIdAndDelete(req.body._id);
          // console.log(data);
          return res.status(200).send("deleted");
        }
      }
    );
  } else {
    return res.status(401).send("unauthorized");
  }
};

// update a specific product

exports.updateProduct = async (req, res, next) => {
  if (req.user) {
    console.log(req.body);
    Item.findOneAndUpdate({ _id: req.body._id }, req.body).exec((err, doc) => {
      if (err) {
        return res.status(200).send("some error happened");
      }
      if (doc) {
        console.log(doc);
        return res.send(true);
      }
    });
  } else {
    return res.status(401).send("unauthorized");
  }
};
