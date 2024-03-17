const mongoose =require('mongoose');

const dbConnection = () => mongoose.connect(process.env.DB_URI,{}).then(function(data){
    console.log(`db connected ${data.connection.host}`);
    })

    // already handled error on the server.js file
// .catch(function(err){
//     // console.log(err);
//     console.log('error in db connection');
// })
module.exports = dbConnection