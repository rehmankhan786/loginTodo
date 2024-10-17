const mognoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const signUpAuth = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    let userData = await userModel.findOne({ email });
    if (userData) {
      return res
        .status(209)
        .json({ message: "User Already exists Try to forgot pasword" });
    }
    let clientData = new userModel({ email, username, password });
    clientData.password = bcrypt.hashSync(password, 10);

    await clientData.save();
    return res.json({ message: "user created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ messgae: "Internal Server Error" });
  }
};

const loginAuth = async (req, res) => {
  try {
    // console.log(req.body)
    const { email, password } = req.body;
    const user = await userModel.findOne({ email:email });
    // console.log(user)
    if (!user) {
      return res.status(500).json({ message: "User Doesn't Exists" });
    }
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({ message: "Incorrect email or password !" });
    }
    const jwtoken =  jwt.sign({user}, process.env.secret);
    return res
      .status(200)
      .cookie("token", jwtoken, { httpOnly: true, expired: "1h" })
      .json({ success: true, jwtoken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const forgotpass = async (req, res, next) => {
    const { email, oldpassword, newpassword, confpass } = req.body;
    console.log(req.body)
    let user = await userModel.findOne({email});
    if(user){
        const isMatch = await bcrypt.compare(oldpassword,user.password);
        if(isMatch){
            user.password =await bcrypt.hash(newpassword,10);
            await user.save();
            return res.status(200).json({message:"password changed successfully"})
        }
        else{
            return res.status(200).json({message:"password did not compares"})

        }
        
    }
    else{
        return res.status(200).json({message:"user did not founded"})

    }


};
module.exports = { loginAuth, signUpAuth,forgotpass };
