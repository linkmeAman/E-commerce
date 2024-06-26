const app = require('./app');

const dotenv = require('dotenv');
const dbConnect = require('./config/db');
const PORT = process.env.PORT || 5000
dotenv.config({path:"backend/config/config.env"});
// handling uncaught exception
process.on('uncaughtException',(err) =>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
})


dbConnect();

const server = app.listen(PORT, () => {
    console.log(`listening on port  http://localhost:${PORT}`);
})
// console.log(dkdsk)

// Unhandled Promise Rejection
process.on('uncaughtException',(err) =>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    })
})