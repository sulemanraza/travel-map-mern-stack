const express = require("express");
const { AddPin, getPin } = require("../controllers/Pin.controller");
const PinRouter = express.Router();

// create Pin endpoint
PinRouter.route("").post(AddPin).get(getPin);

module.exports = PinRouter;
