// Creating Json Web Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  // console.log('user :');
  const token = user.getJWTTOKEN();

  //option for cookies

  const option = {
    expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    )
    }

    res.status(statusCode).cookie('token',token, option).json({success:true,  token});
};



module.exports= sendToken ;