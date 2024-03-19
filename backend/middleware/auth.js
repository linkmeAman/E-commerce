const user = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncError = require("./CatchAsyncError");
const jwttoken = require("jsonwebtoken");

exports.isAuthenticateUser = CatchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwttoken.verify(token, process.env.JWT_SECRET);

  console.log(decodedData);
  req.user = await user.findById(decodedData.id);
  next();
});
