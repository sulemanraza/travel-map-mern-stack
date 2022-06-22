const express = require("express");
const { Register, Login } = require("../controllers/User.controller");
const UserRouter = express.Router();

// create user endpoint
UserRouter.post("/register", Register).post("/login", Login);
module.exports = UserRouter;
