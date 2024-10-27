const mongoose = require("mongoose");
const taskModel = require("../models/taskmodel");

const getAllTasks = async (req, res, next) => {
  // let tasksList = []
  const { id } = req.user;
  const tasks = await taskModel.find({ id });

  return res.status(200).json(tasks);
};
const addNewTask = async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.user;
  await taskModel.create({ title, description, id: id });
  return res.status(200).json({ message: "Task added successfully" });
};

const deleteCurrentTask = async (req, res, next) => {
  const _id = req.params._id;
  let task = await taskModel.findOneAndDelete({ _id: _id });
  if (task) {
    return res
      .status(200)
      .json({ taskRquest: "Delete", message: "Success", task });
  } else {
    return res.status(404).json({
      taskRquest: "Delete",
      message: "failure",
      status: "No Such Task Founded",
    });
  }
};
const getSelectedTask = async (req, res, next) => {
  const id = req.params.id;
  const task = await taskModel.findOne({ userId: id });
  return res.status(200).json(task);
};
const updateCurrentTask = async (req, res, next) => {
  const id = req.params.id;
  let currentTask = await taskModel.findOne({ _id: id });
  console.log(id);
  if (currentTask) {
    currentTask.isCompleted = !currentTask.isCompleted ;
    await currentTask.save();
    res.status(200).json({ success: true, currentTask });
    await currentTask.save();
  } else {
    return res
      .status(404)
      .json({ success: false, status: "Task is not founded" });
  }
};

module.exports = {
  getAllTasks,
  addNewTask,
  deleteCurrentTask,
  updateCurrentTask,
  getSelectedTask,
};
