const express = require('express');
const { getAllProducts, CreateProducts } = require('../controllers/productsController');


const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(CreateProducts);



module.exports = router;