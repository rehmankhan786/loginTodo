// const res = require("express/lib/response");
const joi = require("joi");

const loginValidation = (req, res, next) => {
  // console.log(req.body)
  // const {email,password}  =req.body;
  const loginSchema = joi.object({
    email: joi.string().email().min(3).required(),
    password: joi.string().min(3).max(10).required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    console.log("Validation Error", error.message);
    return res.status(500).json({ message: error.message });
  }
  next();
};

const signUpValidation = (req, res, next) => {
  // console.log(req.body);
  const signUpSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(15).required(),
  });
  const { error } = signUpSchema.validate(req.body);

  if (error) {
    console.log("Validation Error", error.message);
    return res.json({ error: error.message });
  }
  next();
};

const forgotValidation = (req, res, next) => {
  const { email, oldpassword, newpassword, confpass } = req.body;
  console.log(req.body);

  // Validation schema
  const forgotSchema = joi.object({
    email: joi.string().email().required(),
    oldpassword: joi.string().min(3).required(),
    newpassword: joi.string().min(3).required(),
    confpass: joi.string().min(3).required(),
  });

  // Validate the request body
  const { error } = forgotSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Custom validation: Check if passwords match
  if (newpassword !== confpass) {
    return res
      .status(400)
      .json({ message: "New password and confirm password must be the same" });
  }

  next(); // Proceed to the next middleware
};

module.exports = { loginValidation, signUpValidation, forgotValidation };
