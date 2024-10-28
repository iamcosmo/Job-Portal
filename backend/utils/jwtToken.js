export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  //console.log('TOKEN: ',token);
  
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
    secure:true,
    sameSite: 'None'
  };

  //console.log('options: ',options);
  

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
