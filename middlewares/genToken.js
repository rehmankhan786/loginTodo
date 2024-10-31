require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
// const { getUserdata } = require("../controllers/usercontroller");
const secret_key = process.env.secret;
const isProduction = process.env.NODE_ENV === "production";

const genToken = async (user, res) => {
  let { email } = user;
// console.log(`is it ${isProduction}`)
  // console.log(email);
  const data = await userModel.findOne({ email }).select("+password");
  const token = jwt.sign(user, process.env.secret);
  // console.log(process.env.NODE_ENV);
  return res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
      secure: isProduction
      // sameSite: "None",
      // secure: isProduction,
    })
    .json({
      success: true,
      message: "login successfully",
      cookie: token,
      data,
    });
  };
  const clearToken = async (req, res, next) => {
    console.log("Cookie Cleared");
    // let cookies = req.cookies.token
    // console.log(cookies)
    console.log(req);
    return res
    .status(200)
    .cookie("token", "",{
      // httpOnly: true,
      expires: new Date(Date.now()),
      // maxAge: 0,
      // sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
      // secure: isProduction
    })
    .json({ success: true, message: "logged out successfully", cookie: ""});
  };
  module.exports = { genToken, clearToken };
  