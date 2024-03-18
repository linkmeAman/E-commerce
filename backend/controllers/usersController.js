const users = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const AsyncErrors = require('../middleware/CatchAsyncError');
const apiFeatures = require('../utils/apiFeatures');



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

    const token = user.getJWTTOKEN();
    return res.status(201).json({message: "Created Users Success",success:true, user,token});
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