const express = require("express");
const {
  newUser,
  allUser,
  findUserById,
  loginUser,
  logOutUser,
  signUp,
} = require("../controllers/usercontroller");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { tokenAuth, checkToken, afterLoginToken } = require("../middlewares/tokenAuth");
const { signUpValidation } = require("../middlewares/validation");
const userRouter = express.Router();
userRouter.post(
  "/signup",
  catchAsyncError(afterLoginToken),
  catchAsyncError(signUpValidation),
  catchAsyncError(signUp)
);
userRouter.get(
  "/alluser",
  catchAsyncError(tokenAuth),
  catchAsyncError(allUser)
);
userRouter.post("/login", catchAsyncError(checkToken), loginUser);
userRouter.get("/logout", catchAsyncError(tokenAuth), logOutUser);
// userRouter.post("/signup", router);
// userRouter.put("/forgotpass", router);

userRouter.get(
  "/alluser/:id",
  catchAsyncError(tokenAuth),
  catchAsyncError(findUserById)
);
module.exports = userRouter;
