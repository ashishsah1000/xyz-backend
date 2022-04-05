const bcryptjs = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const users = require("../models/users");

module.exports = function (passport) {
  console.log("inside the authentication function");
  passport.use(
    new localStrategy((username, password, done) => {
      users.find({ email: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        user = user[0];

        bcryptjs.compare(password, user.password, (err, result) => {
          console.log("result=", result);
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
