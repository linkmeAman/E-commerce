const express =  require('express');
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());


// Routes imports
const products = require('./routes/productsRoute');
const users = require('./routes/usersRoute');


app.use("/api/v1",products);
app.use("/api/v2",users);
// console.log(app.get('/api/v1/products')); ;


//imports for middleware Error handlers
app.use(errorMiddleware);
// console.log(errorMiddleware);


module.exports = app