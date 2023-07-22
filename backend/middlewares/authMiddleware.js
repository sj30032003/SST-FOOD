// const User= require('../models/User');
// const jwt= require('jsonwebtoken');
// export const requireSignIn = async (req, res, next) => {
//     try {
//       const decode = JWT.verify(
//         req.headers.authorization,
//         process.env.JWT_SECRET
//       );
//       req.user = decode;
//       next();
//     } catch (error) {
//       console.log(error);
//     }
//   };
// export const isAdmin = async (req, res, next) => {
//     try {
//       const user = await User.findById(req.user._id);
//       if (user.role !== 1) {
//         return res.status(401).send({
//           success: false,
//           message: "UnAuthorized Access",
//         });
//       } else {
//         next();
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(401).send({
//         success: false,
//         error,
//         message: "Error in admin middelware",
//       });
//     }
//   };