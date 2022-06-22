const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const UserRouter = require("./src/routes/User.router");
const PinRouter = require("./src/routes/Pin.router");
dotenv.config("./.env");
// middleware
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/pins", PinRouter);

app.get("*", (req, res) => {
  return res
    .status(200)
    .send("Welcome Travel Map APP -- Check Your Router EndPoint");
});

// export app module
module.exports = app;
