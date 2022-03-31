const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// setting up the env file
dotenv.config({ path: "./config/config.env" });

// connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    "server started at port",
    process.env.PORT,
    "in mode : ",
    process.env.NODE_ENV
  );
});
