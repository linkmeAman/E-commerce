const app = require('./app');

const dotenv = require('dotenv');
const dbConnect = require('./config/db');


dotenv.config({path:"backend/config/config.env"});

dbConnect();

app.listen(process.env.PORT, () => {
    console.log(`listening on port  http://localhost:${process.env.PORT}`);
})