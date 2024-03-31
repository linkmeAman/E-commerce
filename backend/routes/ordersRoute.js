const express = require("express");
const router = express.Router();

const { createNewOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orders/ordersController");

const { isAuthenticateUser, isAdminUser } = require("../middleware/auth");

router.route("/orders/new").post(isAuthenticateUser, createNewOrder);

router.route("/orders/:id").get(isAuthenticateUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticateUser, myOrders);

router.route("/admin/orders").get(isAuthenticateUser, isAdminUser("admin"), getAllOrders);

router.route("/admin/order/:id").put(isAuthenticateUser, isAdminUser("admin"), updateOrder).delete(isAuthenticateUser, isAdminUser("admin"), deleteOrder);


module.exports = router;