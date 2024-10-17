
require("dotenv").config();
const os = require("os")
const mongoose = require("mongoose");
const conn = mongoose
  .connect(`mongodb+srv://rehman:rehman12345@cluster0.3h4fn.mongodb.net/database?retryWrites=true`,{dbName:"Tododb"})
  .then((c) => console.log(`mongoose connected ${c.connection.host}`)).catch(err=>console.log(`Mongoose error`,err));


