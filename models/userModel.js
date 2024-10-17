const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: {type:String,select:false},
// user:mongoose.Schema.Types.ObjectId // it will get the user id
// ref:"clientData" // here we have to give the name of collection clientdata is just an example.


});
module.exports =new mongoose.model("client", userSchema);
