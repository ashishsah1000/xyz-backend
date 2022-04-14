const express = require("express");
const Passport = require("passport");
const { createItem, allItems } = require("../controllers/items/itemController");

const router = express.Router();

// all the routers related to items are here

// insert a product

router.route("/createProduct").post(createItem);

// retrive all products
router.route("/getAllItems").get(allItems);

// delete specific product

// update specific product

module.exports = router;
