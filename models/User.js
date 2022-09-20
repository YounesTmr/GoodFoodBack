const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Veuillez renseigner un nom"],
  },
  email: {
    type: String,
    required: [true, "Veuillez renseigner une adresse mail"],
    unique: true,
    validate: [validator.isEmail, "Veuillez renseigner une adresse mail valide"],
  },
  password: {
    type: String,
    required: [true, "Veuillez renseigner un mot de passe"],
    minlength: 8,
    select: false,
  },
  adress: {
    type: String,
    required: [true, "Veuillez renseigner une adresse"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "restaurant", "admin"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
