const express= require('express');
const {registerUsers , getAllUsers , updateUsers , deleteUsers , getSingleUsers} = require ('../controllers/usersController');

const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/users/new").post(registerUsers);
// router.route("/users/:id").put(updateUsers).delete(deleteUsers).get(getSingleUsers); //  you can use both method as the url is same


module.exports = router;