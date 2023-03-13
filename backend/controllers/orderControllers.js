const catchAsyncError = require("../middleware/catchAsyncError");
const orderModel = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandler");
const productModel = require("../models/productModel")
const Razorpay = require("razorpay");

// Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;


    const order = await orderModel.create({
      shippingInfo,
      orderItems,
      // user: req.user._id,
      user: req.body.user,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
    });
    
    if (!order) {
        return next(new ErrorHandler("Order not created", 400));
      }
    res.status(201).json({
      success: true,
      order,
    });
     
  });


  // get Single Order or order details
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({
      success: true,
      order,
    });
  });
  

  // my orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    // const orders = await orderModel.find({user:req.user._id})
    const orders = await orderModel.find({user:'63f49a1d3e602832005a92b9'})
    if (!orders) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({
      success: true,
      orders,
    });
  });
  

  // get all Orders -- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await orderModel.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });

  // update Order Status -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      order
    });
  });
  
  async function updateStock(prodId, quantity) {
    const product = await productModel.findById(prodId);
    console.log('product is',product);
    product.Stock -= quantity;
    console.log('after product is',product);
    await product.save({ validateBeforeSave: false });
  }


  // delete Order -- Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
    await order.remove();
    res.status(200).json({
      success: true,
    });
  });


// order created
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {amount} = req.body;
  const order = await instance.orders.create({
    amount: amount*100,
    currency: "INR",
  })
  res.status(200).json({success:true,order})
});

