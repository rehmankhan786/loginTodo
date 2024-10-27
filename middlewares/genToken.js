require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
// const { getUserdata } = require("../controllers/usercontroller");
const secret_key = process.env.secret;

const genToken = async (user, res) => {
  let {email} = user;
  console.log(email)
  const data = await userModel.findOne({email}).select("+password");
  // const getUserdata = async () => {
  //   // console.log(data);
  // };
  const token = jwt.sign(user, process.env.secret);

  // let userData = await getUserdata(user.email);
  // console.log(userData)
  return res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: process.env.NODE_ENV == "development" ? "lax" : "none",
      secure: process.env.NODE_ENV == "development" ? false : true,
    })
    .json({ success: true, message: "login successfully", cookie: token,data });
};
module.exports = { genToken };
