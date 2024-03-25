const express= require('express');
const {registerUsers , getAllUsers , updateUserPassword , deleteUsers ,loginUsers, logoutUser, resetPassword, forgotPassword, getUserDetails, updateUserProfile } = require ('../controllers/usersController');
const { isAuthenticateUser, isAdminUser } = require('../middleware/auth');

const router = express.Router();

// router.route("/users").get(getAllUsers);
router.route("/users/new").post(isAdminUser,registerUsers);
// router.route("/users/:id").put(updateUsers).delete(deleteUsers).get(getSingleUsers); //  you can use both method as the url is same

//Login User
router.route("/users/login").post(loginUsers);

// User Deatails
router.route("/details").get(isAuthenticateUser,getUserDetails);
// Logout User
router.route("/users/logout").post(logoutUser);

// forgot Password and Reset Password
router.route("/users/resetPassword").post(forgotPassword);

router.route("/password/reset/:resetToken").put(resetPassword);

router.route("/users/password/update").put(isAuthenticateUser,updateUserPassword);

router.route("/users/update").put(isAuthenticateUser, updateUserProfile);




module.exports = router;