const catchAsyncError = require("../middleware/catchAsyncError");
const productModel = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");

// create product
exports.createProduct =catchAsyncError( async (req, res,next) => {
  req.body.user = req.user.id;
  const product = await productModel.create(req.body);
  if (!product) {
    return next(new ErrorHandler('Product Not Found',404))
  }
  res.status(200).json({ success: true, message: "product created", product });
});

// get all products
exports.getAllProducts = catchAsyncError(async (req, res,next) => {
    const resultPerPage = 10
    const totalProducts = await productModel.countDocuments()
    const queryStr = req.query
    const query = productModel.find();
    const apifeatures = new ApiFeatures(query, queryStr).search().filter().pagination(resultPerPage)
    const products = await apifeatures.query
    // console.log('products is: ', products);
  if (!products) {
    return next(new ErrorHandler('Product Not Found',404))
  }
  res.status(200).json({ success: true, products, totalProducts, resultPerPage });
});

// update products
exports.updateProduct = catchAsyncError(async (req, res,next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler('Product Not Found',404))
    }
    const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    console.log('updatedProduct: ',updatedProduct);
    res.status(200).json({ success: true, message: "product updated", updatedProduct });
  });

  // delete products
exports.deleteProduct = catchAsyncError(async (req, res,next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler('Product Not Found',404))
    }
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: "product deleted", deletedProduct });
  });

//   get product details
exports.productDetails = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
        
      return next(new ErrorHandler('Product Not Found',404))
    }
    res.status(200).json({ success: true, product });
  });
  


  // Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await productModel.findById(productId);
  if (!product) {
    return next(new ErrorHandler('Product Not Found',404))
  }
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product
  });
});


// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  // console.log('object');
  const product = await productModel.findById(req.query.id);
  // console.log('object',product);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews  = product.reviews
  res.status(200).json({
    success: true,
    reviews,
  });
});


// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  console.log('reviews: ',reviews);
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  const numOfReviews = reviews.length;
  product = await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    product
  });
});