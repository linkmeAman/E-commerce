const express = require('express');
const { getAllProducts, createProducts ,updateProducts , deleteProducts , getSingleProducts } = require('../controllers/productsController');
const { isAuthenticateUser, isAdminUser } = require('../middleware/auth');


const router = express.Router();

router.route("/products").get(isAuthenticateUser,isAdminUser('admin'),getAllProducts);
router.route("/admin/products/new").post(isAuthenticateUser,isAdminUser('admin'),createProducts);

router.route("/admin/products/:id").put(isAuthenticateUser,isAdminUser('admin'),updateProducts).delete(isAuthenticateUser,isAdminUser('admin'),deleteProducts); //  you can use both method as the url is same
// router.route("/products/:id").put(updateProducts);
// router.route("/products/:id").delete(deleteProducts);
// router.route("/products/:id").get(getSingleProducts);

router.route("/products/:id").get(getSingleProducts);

module.exports = router;