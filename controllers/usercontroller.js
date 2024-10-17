const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { errorHandlerClass } = require("../middlewares/errorMiddleware");
const { genToken } = require("../middlewares/genToken");
const allUser = async (req, res, next) => {
  const alluser = await userModel.find({}).select("+password");
  return res.status(200).json(alluser);
};
const findUserById = async (req, res) => {
  let userData = await userModel.find({ _id: req.params.id });
  res.json(userData);
  next();
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
    }
  } else {
    next(new errorHandlerClass("invalid credentials", 401));
  }
};
const logOutUser = (req, res, next) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({ message: "logged Out successfully" });
};

const signUp = async (req, res, next) => {
  const { email, password, username } = req.body;
  const user = await userModel.findOne({ email });

  if (user) {
    res.status(400).json({ message: "user Already Exists" });
  } else {
    let hashed_pass = await bcrypt.hash(password, 10);
    let clientData = new userModel({ email, username, password: hashed_pass });
    await clientData.save();
    loginUser(req,res,next);

  }
};
module.exports = { allUser, findUserById, loginUser, logOutUser, signUp };
