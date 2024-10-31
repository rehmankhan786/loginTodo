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
  const token = jwt.sign(user, process.env.secret);
  console.log(process.env.NODE_ENV)

  return res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      // sameSite: process.env.NODE_ENV == "development" ? "Lax" : "None",
      // secure: process.env.NODE_ENV == "development" ? false : true,
      sameSite:  "None",
      secure: true,
    })
    .json({ success: true, message: "login successfully", cookie: token,data });
  };
  const clearToken =async(req,res,next)=>{
    console.log("Cookie Cleared")
  return res.status(200).cookie("token", "", {
      httpOnly: true,
      // maxAge: 1,
      expires:new Date(Date.now()),
      sameSite: process.env.NODE_ENV == "development" ? "lax" : "none",
      secure: process.env.NODE_ENV == "development" ? false : true,
    })
    .json({ success: true, message: "logOut successfully", cookie: "" });

}
module.exports = { genToken ,clearToken};
