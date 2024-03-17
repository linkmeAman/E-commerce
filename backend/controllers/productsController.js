// import products from '../models/productsModel';

const products = require('../models/productsModel');
const ErrorHandler = require('../utils/errorHandler');
const AsyncErrors = require('../middleware/CatchAsyncError');
const apiFeatures = require('../utils/apiFeatures');


exports.createProducts = AsyncErrors(async (req, res , next) => {
    const product = await products.create(req.body);

    return res.status(200).json({message: "Created Products Success",success:true, product});
});


exports.getAllProducts = AsyncErrors(async (req, res) => {
    const apiFeature = new apiFeatures(products.find(),req.query).search().filter();
    const product = await apiFeature.query;
    // const product = await products.find();
    return res.status(200).json({message: "getAllProdusts Controller",success:true, product,code:200});
});

exports.getSingleProducts = AsyncErrors(async (req, res) => {
    // apiFeatures(products.findById,req.query.keyword)
    const product = await products.findById(req.params.id);
    if(!product){
        return new ErrorHandler("Product not found",404)
        //return res.status(404).json({message: "Product not found",success:false});
    }
    return res.status(200).json({message: "getSingleProducts Controller",success:true, product});
});


exports.updateProducts = AsyncErrors(async (req, res) => {
    let product = await products.findById(req.params.id);


    if(!product){
        return next(new ErrorHandler("Product not found",404))
        // res.status(404).json({message: "Product not found",success:false});
    }

    product = await products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    return res.status(200).json({message: "Updated Products Success",success:true, product});
});


exports.deleteProducts = AsyncErrors(async (req, res) => {
    const product = await products.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
        // res.status(404).json({message: "Product not found",success:false});
    }
    // await products.remove(); this also an option for deletion
    await products.findByIdAndDelete(req.params.id);
    return res.status(200).json({message: "Deleted Products Success",success:true});

});