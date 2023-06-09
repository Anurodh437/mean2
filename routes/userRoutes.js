const express = require("express");

const {
  signupUser,
  loginUser,
  profile,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddeware");

const router = express.Router();

// User Register Route
router.route("/register").post(signupUser);

// User Login Route
router.route("/login").post(loginUser);

// User Profile Route
router.route("/userProfile").post(protect, profile);

module.exports = router;
