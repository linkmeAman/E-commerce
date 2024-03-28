const express= require('express');
const {registerUsers , getAllUsers , updateUserPassword , deleteUsers ,loginUsers, logoutUser, resetPassword, forgotPassword, getUserDetails, updateUserProfile, getSingleUser, getUserByName, updateUserRole, deleteUser } = require ('../controllers/usersController');
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


//Admin Routes
router.route("/admin/users/allUsers").get(isAuthenticateUser, isAdminUser('admin'), getAllUsers);

// router.route("/admin/users/:id").delete(isAuthenticateUser, isAdminUser('admin'), deleteUsers);

router.route("/admin/users/getSingleUser/:id").get(isAuthenticateUser, isAdminUser('admin'), getSingleUser).put(isAuthenticateUser, isAdminUser('admin'),updateUserRole).delete(isAuthenticateUser, isAdminUser('admin'), deleteUser);

// router.route("/admin/users/name").get(isAuthenticateUser, isAdminUser('admin'), getUserByName);  

router.route("/admin/users/role").get(isAuthenticateUser, isAdminUser('admin'), updateUserRole);


module.exports = router;