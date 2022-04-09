const express = require("express");
const Passport = require("passport");

const router = express.Router();
Passport;

const {
  newUser,
  userCheck,
  userCheckPost,
  findUser,
  homepage,
  login,
  logout,
} = require("../controllers/userController");

// sing up and registeration routes
router.route("/user/new").post(newUser);
router.route("/user").post(userCheckPost);
router.route("/user/check").get(findUser);
router.route("/user").get(userCheck); //for checking the route

// sign in routes

router.route("/user/login").post(login);
router.route("/homepage").get(homepage);

// signout routes
router.route("/user/logout").post(logout);

module.exports = router;
