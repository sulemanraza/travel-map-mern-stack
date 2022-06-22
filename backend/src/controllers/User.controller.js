const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { validateEmail, createUsername } = require("../helper/validator");
const { generateToken } = require("../helper/jwtToken");

// Register a User
exports.Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // check email and validate
    const checkEmail = await User.findOne({ email });
    if (!validateEmail) {
      return res.status(404).json({ message: "invalid Email" });
    }
    if (checkEmail) {
      return res.status(400).json({ message: "User exist with email" });
    }
    const userName = await createUsername(username); //create username if already exist
    const hashPassword = bcrypt.hashSync(password, 12);
    // create user
    const user = new User({
      username: userName,
      email,
      password: hashPassword,
    });
    await user.save();
    // create token
    const token = generateToken({ id: user._id.toString() }, "7d");
    // send response
    return res.status(201).json({
      status: "success",
      user: {
        _id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Login a User
exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exist with email" });
    }
    // check password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "invalid Password" });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");
    // send response
    return res.status(200).json({ username: user.username });
  } catch (error) {
    return res.status(500).json(error);
  }
};
