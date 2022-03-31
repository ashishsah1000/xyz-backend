const express = require("express");
const router = express.Router();

const {
  newUser,
  userCheck,
  findUser,
} = require("../controllers/userController");

router.route("/user/new").post(newUser);
router.route("/user/check").get(findUser);
router.route("/user").get(userCheck); //for checking the route

module.exports = router;
