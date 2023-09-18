const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    auth_time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
