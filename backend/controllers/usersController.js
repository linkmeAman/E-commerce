const users = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const AsyncErrors = require('../middleware/CatchAsyncError');
const apiFeatures = require('../utils/apiFeatures');
const sendToken = require('../utils/jwtToken');
const sendEmail  = require('../utils/sendEmail');
const crypto = require('crypto');



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

// Update User Profile

exports.updateUserProfile = AsyncErrors(async (req, res, next) => {
    console.log(req.body);
    console.log(req.user);

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // Will be Adding cloudinary later
    const user = await users.findByIdAndUpdate(req.user.id, newUserData, {
        new:true,
        runValidators: true,
        useFindAndModify: false
    });


   await user.save();
   res.status(200).json({
       success: true,
       user,
       message: "User Updated Successfully"
   })
})


//Logout users

exports.logoutUser = AsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Successfully Logout"
    })
})


// Forgot Password

exports.forgotPassword = AsyncErrors(async (req, res, next) => {
    const user = await users.findOne({email: req.body.email});


    if(!user){
        return next(new ErrorHandler("User Not Found",404));
    }

    const resetToken = await user.userResetPasswordToken();
    console.log("Rest :",resetToken,":::");
    await user.save({validateBeforeSave: false});

    const resetPaswordUrl = `${req.protocol}://${req.get("host")}/api/v2/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPaswordUrl} \n\n If you have not requested this email then, please ignore it.`;


    try{

        await sendEmail({
            email: user.email, Subject: `Ecommerce Password Recovery`, message  })
        return res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
            code: 200
        })

    }catch(e){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(e.message,500));
    }
})


// Reset Password
exports.resetPassword = AsyncErrors(async (req, res, next) => {
    console.log(req.params.resetToken);

    /**========================================================================
     * ?this is password req.params.resetToken this is set in userModal userResetPasswordToken
     *========================================================================**/
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest("hex");
    console.log(resetPasswordToken);
    const user = await users.findOne({resetPasswordToken,resetPasswordExpire:{$gt: Date.now()}});
    console.log('user :');
    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.passwordConfirm) {
        return next(new ErrorHandler("Password does not match",400));
    }
    // console.log('user :');
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    await sendToken(user, 200, res);
})

// Get User Details
exports.getUserDetails = AsyncErrors(async function(req, res, next){
    console.log('getUser', req.users);
    const user = await users.findById(req.user.id);
    if(!user){
        return next(new ErrorHandler(`User not found ${req.user.id}`,404));
    }
    return res.status(200).json({
        success: true,
        user,
        code: 200
    })
})

// Update User Password
exports.updateUserPassword = AsyncErrors(async function(req, res, next){
    const user = await users.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})