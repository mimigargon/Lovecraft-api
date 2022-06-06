const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    city: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user', required: true }, 
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
