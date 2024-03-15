const mongoose =require('mongoose');

const dbConnection = () => mongoose.connect(process.env.DB_URI,{}).then(function(data){
    console.log(`db connected ${data.connection.host}`);
}).catch(function(err){
    console.log(err);
})

module.exports = dbConnection