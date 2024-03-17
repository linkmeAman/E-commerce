const express = require('express');
const { getAllProducts, createProducts ,updateProducts , deleteProducts , getSingleProducts } = require('../controllers/productsController');


const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProducts);

router.route("/products/:id").put(updateProducts).delete(deleteProducts).get(getSingleProducts); //  you can use both method as the url is same
// router.route("/products/:id").put(updateProducts);
// router.route("/products/:id").delete(deleteProducts);
// router.route("/products/:id").get(getSingleProducts);



module.exports = router;