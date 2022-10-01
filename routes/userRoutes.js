const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// User Register Route
router.route("/register").post(signupUser);

// User Login Route
router.route("/login").post(loginUser);

// User Profile Route
// router.get("/userProfile",(req,res)=>{
//     res.send("userProfile Working!")
// })

module.exports = router;
