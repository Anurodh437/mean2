const express = require("express");
const { protect } = require("../middleware/authMiddeware");
const router = express.Router();

const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.route('/').get(protect, getTasks)
router.route("/create").post(protect, createTask);
router
  .route("/:id")
  .get(getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
