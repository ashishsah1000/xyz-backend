const express = require("express");
const cors = require("cors");

const router = express.Router();

const {
  newUser,
  userCheck,
  findUser,
} = require("../controllers/userController");

router.route("/user/new", cors()).post(newUser);
router.route("/user/check").get(findUser);
router.route("/user").get(userCheck); //for checking the route

module.exports = router;
