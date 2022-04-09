const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const morgon = require("morgan");
const MongoDBStore = require("connect-mongodb-session");
// setting up the env file
dotenv.config({ path: "./config/config.env" });

// session store
const mongoStore = MongoDBStore(session);

// connecting to database
connectDatabase();
app.use(morgon("dev"));
// intialize the passport

const store = new mongoStore({
  collection: "userSessions",
  uri: process.env.DB_LOCAL_URL,
  expires: 1000,
});
app.use(
  session({
    name: "SESS_NAME",
    secret: "SESS_SECRET",
    store: store,
    saveUninitialized: true,
    resave: false,
    cookie: {
      // secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./auth/passportConfig")(passport);

// declare all the routes
// all the users routes

const users = require("./routes/users");
app.use("/", users);

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
