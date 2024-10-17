require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const secret_key = process.env.secret;

const genToken = (user, res) => {
  const token = jwt.sign(user, process.env.secret);

  return res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: process.env.NODE_ENV=="development"?"lax":"none",
      secure: process.env.NODE_ENV=="development"?false:true,
    })
    .json({ success: true, message: "login successfully" });
};
module.exports = { genToken };
