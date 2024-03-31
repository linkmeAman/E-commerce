const express =  require('express');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(cookieParser());


// Routes imports
const products = require('./routes/productsRoute');
const users = require('./routes/usersRoute');

const orders = require("./routes/ordersRoute");


app.use("/api/v1",products);
app.use("/api/v2",users);
app.use("/api/v3",orders);  // for ordering product
// console.log(app.get('/api/v1/products')); ;


//imports for middleware Error handlers
app.use(errorMiddleware);
// console.log(errorMiddleware);


module.exports = app