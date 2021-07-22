// Create and send token  and save in the cookie


const sendToken = (user, statusCode, res) => {
    // Create jwt token
    const token = user.getJwtToken();
  
    res.status(statusCode).json({
         sucess: true, 
         token ,
         user
      });
  };
  module.exports= sendToken;