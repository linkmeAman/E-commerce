const products = require("../../models/productsModel");
const users = require("../../models/userModel");
const ErrorHandler = require("../../utils/errorHandler");
const AsyncErrors = require("../../middleware/CatchAsyncError");
const orders = require("../../models/orderModel");

// Create New Order
exports.createNewOrder = AsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await orders.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = AsyncErrors(async (req, res, next) => {
  const order = await orders
    .findById(req.params.id)
    .populate("user", "name email");
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//NOTE - Only orders for logged in user
exports.myOrders = AsyncErrors(async (req, res, next) => {
  // console.log("GGG : ",req.user)
  const order = await orders.find({ user: req.user._id });

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// get All Orders (Admin Only)

exports.getAllOrders = AsyncErrors(async (req, res, next) => {
  const order = await orders.find();

  if (!order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order not found", 404));
  }
  var totalAmount = 0;
  console.log("Order : ", order);
  order.forEach(function (order) {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    order,
  });
});

// update order Status (Admin Only)
exports.updateOrder = AsyncErrors(async (req, res, next) => {
  const order = await orders.findById(req.params.id);
  // console.log(order.orderStatus);
  if(!order){
    return next(new ErrorHandler("Order not found", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order has already been delivered", 404));
  }

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  order.orderItems.forEach(async (o) => {
    await updateStock(o.productId, o.quantity);
  });

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order
  });
});

async function updateStock(orderId, quantity) {
  // console.log("OrderId : ", orderId);
  const product = await products.findById(orderId);
  // console.log("product : ", product.stock);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order -- Admin Only

exports.deleteOrder = AsyncErrors(async (req, res, next) => {
  const order = await orders.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found by this ${req.params.id}`, 404)
    );
  }
  await orders.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Order Deleted Successfully",
  });
});
