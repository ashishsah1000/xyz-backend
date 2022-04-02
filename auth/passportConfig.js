const bcryptjs = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const users = require("../models/users");

module.exports = function (passport) {
  passport.use(
    new localStrategy((email, password, done) => {
      username.find({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
  passport.serializeUser((user, cb) => {
    cb(user, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.find({ _id: id }, (err, user) => {
      cb(err, user);
    });
  });
};
