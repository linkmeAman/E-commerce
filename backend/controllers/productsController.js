// import products from '../models/productsModel';

const products = require("../models/productsModel");
const ErrorHandler = require("../utils/errorHandler");
const AsyncErrors = require("../middleware/CatchAsyncError");
const apiFeatures = require("../utils/apiFeatures");

exports.createProducts = AsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await products.create(req.body);

  return res
    .status(200)
    .json({ message: "Created Products Success", success: true, product });
});

exports.getAllProducts = AsyncErrors(async (req, res) => {
  // this is the number of products to seen
  const productsPerPage = 5;

  // this is the count of the products we be receiving
  const productsCount = await products.countDocuments();

  const apiFeature = new apiFeatures(products.find(), req.query)
    .search()
    .filter()
    .pagination(productsPerPage);
  const product = await apiFeature.query;
  // const product = await products.find();
  return res.status(200).json({
    message: "Fetch All Products ",
    success: true,
    product,
    code: 200,
    productsCount,
  });
});

exports.getSingleProducts = AsyncErrors(async (req, res) => {
  // apiFeatures(products.findById,req.query.keyword)
  const product = await products.findById(req.params.id);
  if (!product) {
    return new ErrorHandler("Product not found", 404);
    //return res.status(404).json({message: "Product not found",success:false});
  }
  return res
    .status(200)
    .json({ message: "getSingleProducts Controller", success: true, product });
});

exports.updateProducts = AsyncErrors(async (req, res) => {
  let product = await products.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    // res.status(404).json({message: "Product not found",success:false});
  }

  product = await products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res
    .status(200)
    .json({ message: "Updated Products Success", success: true, product });
});

exports.deleteProducts = AsyncErrors(async (req, res) => {
  const product = await products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    // res.status(404).json({message: "Product not found",success:false});
  }
  // await products.remove(); this also an option for deletion
  await products.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({ message: "Deleted Products Success", success: true });
});

// Creating a controller for reviewing and giving updating rating and reviews

exports.creatingProductReviews = AsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await products.findById(productId);

  // console.log("Review : ", product)
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  const prevRating = product.reviews.rating

  // console.log("Product : ",isReviewed);
  if (isReviewed) {
    product.reviews.forEach((rev) =>{
      if(rev.user.toString() === req.user._id.toString()){
        (rev.rating = rating), (rev.comment = comment);
      }
    })
  } else {
    // console.log("Product : ",product);
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
    console.log(product.reviews.length);
  }
  
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  })
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true
  })
});


//LINK - get all reviews of particular product
exports.getProductReviews = AsyncErrors(async (req, res, next) => {
  const product = await products.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    ratings: product.ratings,
    reviews: product.reviews,
  });

})


//NOTE - Delete Review

exports.deleteReview = AsyncErrors(async (req, res, next) => {
  const product = await products.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Review not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  )
  // await product.remove();
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  })
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await products.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });

})
