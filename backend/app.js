const express =  require('express');

const app = express();

app.use(express.json());
// Routes imports

const products = require('./routes/productsRoute');


app.use("/api/v1",products);





console.log(app.get('/api/v1/products')); ;




module.exports = app