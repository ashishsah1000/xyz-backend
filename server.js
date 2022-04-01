const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const morgon = require("morgan");
// setting up the env file
dotenv.config({ path: "./config/config.env" });

// connecting to database
connectDatabase();
app.use(morgon("dev"));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.listen(process.env.PORT, () => {
  console.log(
    "server started at port",
    process.env.PORT,
    "in mode : ",
    process.env.NODE_ENV
  );
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
