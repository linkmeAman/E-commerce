// import products from '../models/productsModel';

const products = require('../models/productsModel');


exports.CreateProducts = async (req, res , next) => {
    const product = await products.create(req.body);

    res.status(200).json({message: "Created Products Success",success:true, product});
}

exports.getAllProducts = async (req, res) => {
    res.status(200).json({message: "getAllProdusts Controller"});
}

exports.getAllProducts = async (req, res) => {
    res.status(200).json({message: "getAllProdusts Controller"})
}