const ErrorHandler = require("../utils/errorHandler");


module.exports = (err, req ,res ,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //!Wrong mongoose id
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        // console.log(message);
        err = new ErrorHandler(message,400);
    }


    //! - Duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
    }


    //! WARNING: Invalid JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Invalid JWT token, try again`;
        err = new ErrorHandler(message,401);
    } 


    //! WARNING: Expired JWT error
    if(err.name === "TokenExpiredError"){
        const message = `Expired JWT token, try again`;
        err = new ErrorHandler(message,401);
    } 

    res.status(err.statusCode).json({
        success:false,
        // error:err,
        message:err.message
    })
}