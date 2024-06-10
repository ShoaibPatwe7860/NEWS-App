// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: "" },
//     email: { type: String, required: "" },
//     password: { type: String, required: "" },
//   },
//   {
//     timestamps: true,
//   }
// );

// const UserModel = mongoose.model("users", userSchema);

// module.exports = UserModel;

// UserModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure uniqueness for email
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
