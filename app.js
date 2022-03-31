const express = require("express");

const app = express();

app.use(express.json());

// all the routes

const users = require("./routes/users");

app.use("/", users);
module.exports = app;
