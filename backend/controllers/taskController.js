const mongoose = require("mongoose");
const Task = require("../models/Task");

const student = "24CS039";

async function listTasks(req, res, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, studentId: student, tasks });
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      studentId: student,
      message: "Task created",
      task
    });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        studentId: student,
        error: "Task not found"
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        studentId: student,
        error: "Task not found"
      });
    }

    res.json({
      success: true,
      studentId: student,
      message: "Task updated",
      task
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        studentId: student,
        error: "Task not found"
      });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        studentId: student,
        error: "Task not found"
      });
    }

    res.json({
      success: true,
      studentId: student,
      message: "Task deleted",
      task
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listTasks,
  createTask,
  updateTask,
  deleteTask
};
