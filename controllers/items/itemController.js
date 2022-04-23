const passport = require("passport");
const Mongoose =  require("mongoose")
const items = require("../../models/items");


// insert a product
exports.createItem = async (req, res, next) => {
  if (req.user) {
    await items.findOne({ username: req.body.username }, async (err, doc) => {
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
    console.log(req.user[0].email);
    items.findOne({username:req.user[0].email},(err, doc) => {
      if (err) {
        console.log(err);
        res.send("there has been error on the server");
      } if(doc) {
        console.log("sending docs",doc)
        return res.send(doc);
      }
      else{
        res.send("no doc")
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
    console.log(req.body)
    await items.find( {username:req.body.username},(err,docs)=>{
      if(err){
        console.log(err);
        return res.status(200).send("some error happened")
      }
      if(docs){
        console.log(`new ObjectId("${req.body._id}")`)
        const data =  docs[0].items.filter((item)=>item._id!=Mongoose.Types.ObjectId(req.body._id))
        console.log(data);
    }
    
    }
    )
    return res.status(200).send("deleted")
  }
  else{
    return res.status(401).send("unauthorized");
  }
}