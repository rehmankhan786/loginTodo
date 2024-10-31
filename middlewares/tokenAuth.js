require("dotenv").config();
const jwt = require("jsonwebtoken");
const { errorHandlerClass } = require("./errorMiddleware");
require("cookie-parser");

const tokenAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const verifiedData = jwt.verify(token, process.env.secret);
    if (verifiedData) {
      req.user = verifiedData;

      next();
    } else {
      next(
        new errorHandlerClass(
          "miscellensous error / error in verifying User",
          401
        )
      );
    }
  } else {
    return res
      .status(401)
      .clearCookie("token", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
        secure: process.env.NODE_ENV === "development" ? false : true,
      })
      .json({ status: "UnAuthorized User/Token ", message: "Login first" });
  }
};
const checkToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    // console.log(token)
    tokenAuth(req, res, next);
    const verifiedData = jwt.verify(token, process.env.secret);

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
};
const afterLoginToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    return res
      .status(400)
      .json({ success: false, message: "cannot signUp already logged In" });
  } else {
    return res
      .status(401)
      .json({ status: "UnAuthorized User/Token ", message: "Login first" });
  }
};

module.exports = { tokenAuth, checkToken, afterLoginToken };
