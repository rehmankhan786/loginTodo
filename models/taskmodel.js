const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  isCompleted: { type: Boolean, default: false },
  userId:{type: mongoose.Schema.Types.ObjectId, ref: "client"},
  id:{type:mongoose.Schema.Types.ObjectId},
 
  createdAt: { type: Date, default: Date.now },
});
module.exports = new mongoose.model("task", taskSchema);
