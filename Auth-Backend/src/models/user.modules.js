const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      isActive: Boolean,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

// Timestamp true enables createdAt and updatedAt as two values

const User = mongoose.Model("User", userSchema);

module.exports = User;
