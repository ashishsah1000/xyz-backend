const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);

app.use(express.json());

module.exports = app;
