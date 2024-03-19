const users = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const AsyncErrors = require('../middleware/CatchAsyncError');
const apiFeatures = require('../utils/apiFeatures');
const sendToken = require('../utils/jwtToken');



exports.registerUsers = AsyncErrors(async (req, res, next) => {

    const {name, email, password} = req.body;
    const user = await users.create({
        name,
        email,
        password,
        avatar: {
            public_id: "sample id",
            url: "sample url"
        }
    });

    
    sendToken(user, 201, res);
})


exports.getAllUsers = AsyncErrors(async (req, res) => {
    // this is the number of products to seen
    const usersPerPage = 5;

    const userCount = await users.countDocuments();


    const apiFeature = await apiFeatures(users.find(), req.query).search().filter().pagination(usersPerPage);

    const user = await apiFeature.query;
    return res
    .status(200)
    .json({
      message: "Fetch All Products ",
      success: true,
      product,
      code: 200,
      user,
    });
})


exports.loginUsers = AsyncErrors(async (req, res, next) => {
    
    // console.log(req);
    const {email,password} = req.body;

    // checking if user has given password and email both
    if(!email || !password) {
         return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user = await users.findOne({email}).select("+password");
    // console.log(user);

    if(!user){
        return next(new ErrorHandler("Not User Found",401));
    }


    const passwordConfirm = await user.comparePassword(password);
    // console.log(passwordConfirm);
    if(!passwordConfirm){
        return next(new ErrorHandler("Password is Incorrect",401));
    }

    
    sendToken(user, 200, res);
})