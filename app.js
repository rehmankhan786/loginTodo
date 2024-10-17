require("dotenv").config();
require("./models/conn");
const os = require("os");
const mongoose = require("mongoose");
const express = require("express");
const userModel = require("./models/userModel");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cluster = require("cluster");
// const cluster = require("node:cluster")
const {
  loginValidation,
  signUpValidation,
} = require("./middlewares/validation");
const {
  loginAuth,
  signUpAuth,
  forgotpass,
} = require("./controllers/authController");
const router = require("./routes/authRoutes");
const loginRoute = require("./routes/loginRoutes");
const cors =  require("cors") // cross origin resource sharing
const tokenAuth = require("./middlewares/tokenAuth");
// const userModel = require("./models/userModel")
const userRouter = require("./routes/userRoutes");
const { errorhandler } = require("./middlewares/errorMiddleware");
const taskRoutes  =require("./routes/taskRoutes")
const app = express();
const port = process.env.port || 4000;

// usiing middlewares\
app.use(cors({
  origin:[process.env.FRONT_URL],
  methods:["GET","PUT","POST","DELETE"],
  credentials:true


}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/task',taskRoutes)
app.use("/user", userRouter);

// making an error-Handler
app.use(errorhandler);
// console.log(os.cpus().length)


module.exports = {app,os,port};
