const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// all the routes

const users = require("./routes/users");

app.use("/", users);
module.exports = app;
