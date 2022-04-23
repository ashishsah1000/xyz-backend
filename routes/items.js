const express = require("express");
const Passport = require("passport");
const { createItem, allItems,deleteProduct } = require("../controllers/items/itemController");

const router = express.Router();

// all the routers related to items are here

// insert a product
router.route("/createProduct").post(createItem);

// retrive all products
router.route("/getAllItems").get(allItems);

// delete specific product
router.route("/removeProduct").post(deleteProduct)

// update specific product

module.exports = router;
