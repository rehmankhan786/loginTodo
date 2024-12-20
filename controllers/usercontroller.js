require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { errorHandlerClass } = require("../middlewares/errorMiddleware");
const { genToken, clearToken } = require("../middlewares/genToken");
const jwt = require("jsonwebtoken");

const allUser = async (req, res, next) => {
  const alluser = await userModel.find({}).select("+password");
  return res.status(200).json(alluser);
};
const findUserById = async (req, res) => {
  let userData = await userModel.find({ _id: req.params.id });
  res.json(userData);
  next();
};
const findUserByCookie = async (req, res, next) => {
  const userCookie = req.cookies.token;
  try {
    const cookieData = jwt.verify(userCookie, process.env.secret);
    const userData = await userModel.findOne({ email: cookieData.email });
    return res.status(200).json(userData);
    // next();
  } catch (error) {
    clearToken(req,res,next)
  }
};
const loginUser = async (req, res, next) => {
  if (req.user) {
    return res
      .status(200)
      .json({ user: " verified", message: "user already logged in" });
  }
  const { email, password } = req.body;
  const userData = await userModel
    .findOne({ email: email })
    .select("+password");
  if (userData) {
    const isMatch = await bcrypt.compare(password, userData.password);
    if (isMatch) {
      const nec_user_details = { email: userData.email, id: userData._id };
       await genToken(nec_user_details, res);
      // console.log(token)
    } else {
      return res.status(401).json({ message: "incorrect email or password" });
    }
  } else {
    next(new errorHandlerClass("invalid credentials", 401));
  }
};
// const logOutUser = (req, res, next) => {
//   console.log("Cookie Cleared");
//   clearToken(req,res,next);
// };
const logOutUser = (req, res, next) => clearToken(req, res, next);

const signUp = async (req, res, next) => {
  const { email, password, username } = req.body;
  const user = await userModel.findOne({ email });

  if (user) {
    res.status(400).json({ message: "user Already Exists" });
  } else {
    let hashed_pass = await bcrypt.hash(password, 10);
    let clientData = new userModel({ email, username, password: hashed_pass });
    await clientData.save();
    loginUser(req, res, next);
  }
};
module.exports = {
  allUser,
  findUserById,
  loginUser,
  logOutUser,
  signUp,
  findUserByCookie,
};
