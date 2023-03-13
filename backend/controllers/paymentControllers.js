const Razorpay = require("razorpay");
const catchAsyncError = require("../middleware/catchAsyncError");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// Api key
exports.apiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ success: true, api_key: "rzp_test_mLOUV5h7OTg6MG" });
});

// Payment verification
exports.paymentVerification = async (req, res) => {
  // console.log('payment verification');
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const generated_signature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature == razorpay_signature) {
    res.redirect(
      `http://localhost:8000/payment/confirmation?ref=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
