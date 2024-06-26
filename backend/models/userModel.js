const mongoose = require("mongoose");
const validator = require("validator");
const bcryyptjs = require("bcryptjs");
const jwttoken = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryyptjs.hash(this.password, 10);
});


// JWT token
userSchema.methods.getJWTTOKEN = function(){
    return jwttoken.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// Resetting Password
userSchema.methods.userResetPasswordToken = async function(){

  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex");
  console.log(this.resetPasswordToken);

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  // this is password req.params.resetToken
  return resetToken;
}


// Comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryyptjs.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);