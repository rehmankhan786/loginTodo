
require("dotenv").config();
const os = require("os")
const mongoose = require("mongoose");
const conn = mongoose
  .connect(`${process.env.mongoAdress}/clientData`)
  .then(() => console.log(`mongoose connected ${os.hostname}`)).catch(err=>console.log(err));
