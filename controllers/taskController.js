const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

const createTask = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the Fields");
  } else {
    const task = new Task({ user: req.user._id, title, content, category });
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  }
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const task = await Task.findById(req.params.id);
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform changes to this");
  }
  if (task) {
    task.title = title;
    task.content = content;
    task.category = category;

    const updateTask = await task.save();
    res.json(updateTask);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform changes to this");
  }
  if (task) {
    await task.remove();
    res.json({ message: "Task removed" });
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
