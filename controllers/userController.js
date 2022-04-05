const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const passport = require("passport");

const { findById } = require("../models/users");
const User = require("../models/users");

// this is the test route for users

exports.userCheck = (req, res, next) => {
  res.status(200).json({
    success: true,
  });
};
exports.userCheckPost = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "post request is working fine",
  });
};

// create new user

exports.newUser = async (req, res, next) => {
  try {
    await User.findOne({ email: req.body.email }, async (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        res.send("user already exist");
      }
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(err);
        req.body.password = hashedPassword;
        const user = await User.create(req.body);

        res.status(201).json({
          success: true,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// find the user

exports.findUser = async (req, res, next) => {
  const user = await findById(req.params.id).catch((err) => {
    console.log(err);
  });
  if (!user) {
    res.status(201).json({
      success: false,
    });
  }
  res.status(201).json({
    success: true,
  });
};

// login route

exports.login = async (req, res, next) => {
  // await User.findOne({ email: req.body.email }, (err, doc) => {
  //   if (err) console.log(err);
  //   if (doc) {
  //     console.log(doc);
  //     const user = doc;

  // passport.authenticate("local", { failureRedirect: "/login" }),
  //   function (req, res,next) {
  console.log("inside the post login routes");
  passport.authenticate("local", { successRedirect: "/homepage" })(
    (req, res, next) => {
      console.log(res);
    }
  );

  // };
};

// basic blank page to check if user is present
exports.homepage = (req, res, next) => {
  console.log(req);
  if (req.user) {
    res.status(200).json({
      authenticate: true,
      data: req.user,
    });
  } else {
    res.send("use not authenticated");
  }
};
