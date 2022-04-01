const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

// all the routes

const users = require("./routes/users");

app.use("/", users);
module.exports = app;
