const express = require("express");
const {
  newUser,
  allUser,
  findUserById,
  loginUser,
  logOutUser,
  signUp,
  findUserByCookie,
} = require("../controllers/usercontroller");
const catchAsyncError = require("../middlewares/catchAsyncError");
const {
  tokenAuth,
  checkToken,
  afterLoginToken,
} = require("../middlewares/tokenAuth");
const { signUpValidation } = require("../middlewares/validation");
const userRouter = express.Router();
userRouter.post(
  "/signup",
  catchAsyncError(signUpValidation),
  catchAsyncError(signUp)
);
userRouter.get(
  "/alluser",
  catchAsyncError(afterLoginToken),
  catchAsyncError(tokenAuth),
  catchAsyncError(allUser)
);
userRouter.post("/login", catchAsyncError(checkToken), loginUser);
userRouter.get("/logout", catchAsyncError(tokenAuth), logOutUser);
// userRouter.post("/signup", router);
// userRouter.put("/forgotpass", router);

userRouter.get(
  "/alluser/:id",
  catchAsyncError(afterLoginToken),
  catchAsyncError(tokenAuth),
  catchAsyncError(findUserById)
);
userRouter.get(
  "/profile",
  (req, res, next) => {
    if (req.cookies.token) {
      console.log(req.cookies);
      next();
    } else {
      console.log('no cookies founded')
      return res.status(400).json({ message: "Login first" });
    }
    // console.log(req.cookies.token);
    // next();
  },
  // catchAsyncError(afterLoginToken),
  // catchAsyncError(tokenAuth),
  catchAsyncError(findUserByCookie)
);
module.exports = userRouter;
