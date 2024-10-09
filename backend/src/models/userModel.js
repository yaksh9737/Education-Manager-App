// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Changed to bcryptjs

// Define the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Teacher", "Student"],
    default: "Student",
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // bcryptjs hash
  next();
});

// Compare hashed password for login
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // bcryptjs compare
};

module.exports = mongoose.model("User", UserSchema);
