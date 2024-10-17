const express = require("express");
const {
  getAllTasks,
  addNewTask,
  deleteCurrentTask,
  updateCurrentTask,
  getSelectedTask,
} = require("../controllers/taskController");
const { checkToken, tokenAuth } = require("../middlewares/tokenAuth");
const catchAsyncError = require("../middlewares/catchAsyncError");
const router = express.Router();

router.get("/all", catchAsyncError(tokenAuth), getAllTasks);
router.post("/new", catchAsyncError(tokenAuth), addNewTask);
router.delete("/:_id", catchAsyncError(tokenAuth), deleteCurrentTask);
router.put("/update/:id", catchAsyncError(tokenAuth), updateCurrentTask);

router.get("/:id", getSelectedTask);
module.exports = router;
