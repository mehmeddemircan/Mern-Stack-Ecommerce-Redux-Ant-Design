const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.isAuthenticatedUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
        success: false,
        error: 'Login first to access this route'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
        res.status(401).json({
            success: false,
            error: 'No user found with this id'
        })
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({
        success: false,
        error: 'Login first to access this route'
    })
  }
};


// Admin check middleware 

// exports.adminCheck = async (req,res,next ) => {
//   const {email} = req.body 

//   const adminUser = await User.findOne({email})

//   if (adminUser.role !== "admin") {
//     res.status(403).json({
//       error : 'only admins can access this route , try different route please '
//     })
//   }
//     next()


// }

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {

      if (!roles.includes(req.user.role)) {
        
            res.status(403).json({
              error :`Role (${req.user.role}) is not allowed to acccess this resource`
            })
         
      }
      next()
  }
}