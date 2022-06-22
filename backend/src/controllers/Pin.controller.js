const Pin = require("../models/Pin.model");

// create add Pin Controller
exports.AddPin = async (req, res) => {
  try {
    const pin = new Pin(req.body);
    await pin.save();
    return res.status(201).json(pin);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// create get Pin Controller
exports.getPin = async (req, res) => {
  try {
    const pin = await Pin.find();
    return res.status(200).json(pin);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
