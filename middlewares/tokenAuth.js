require("dotenv").config();
const jwt = require("jsonwebtoken");
const { errorHandlerClass } = require("./errorMiddleware");
require("cookie-parser");

const tokenAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const verifiedData =  jwt.verify(token, process.env.secret);
    if (verifiedData) {
      req.user = verifiedData;
      // return res.json({ success: true, verifiedData });

      next();
    } else {
      next(
        new errorHandlerClass("miscellensous error / error in verifying User", 401)
      );
    }
  } else {
    return res.status(401).json({ status: "UnAuthorized User/Token ",message:"Login first" });
  }
  // next();
};
const checkToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    // console.log(token)
    tokenAuth(req, res, next);
    const verifiedData =  jwt.verify(token,process.env.secret)

    if (verifiedData) {
      req.user = verifiedData;

    } else {
      next(
        new errorHandlerClass("miscellensous error / usAuthorized user", 401)
      );
    }
  } else {
    next();
  }
  // next();
};

module.exports = { tokenAuth, checkToken };
