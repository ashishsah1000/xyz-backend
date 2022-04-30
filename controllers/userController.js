const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const passport = require("passport");

const { findById } = require("../models/users");
const User = require("../models/users");

// this is the test route for users

exports.userCheck = (req, res, next) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
    });
  } else
    return res.status(200).json({
      success: false,
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

exports.login = (req, res, next) => {
  if (req.user) {
    return res.send("user is already logged in");
  }
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err);
      return res.status(401).json(err);
    }
    if (user) {
      console.log("user found and authenticated");
      console.log("use is ", user);
      req.login(user, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("req username" + req.user);
        const user = {
          name: req.user.name,
          username: req.user.email,
          email: req.user.email,
          id: req.user._id,
          timeStamp: Date.now(),
        };
        return res.send(user);
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res, next);
};

// basic blank page to check if user is present
exports.homepage = (req, res, next) => {
  console.log("In homepage route");
  console.log(req.user);
  if (req.user) {
    res.status(200).json({
      authenticate: true,
      data: req.user,
    });
  } else {
    res.send("use not authenticated");
  }
};

exports.logout = (req, res, next) => {
  if (!req.user) {
    res.send("no user has logged in");
  } else {
    req.logout();
    res.send("successfully logged out check the status");
  }
};
