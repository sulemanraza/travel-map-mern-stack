const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 50,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
