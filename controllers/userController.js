const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const { sendEmailToUSer } = require("../utility/mail");

// /api/user/signup
// POST request
// controller to signup a user
const signupUser = asyncHandler(async (req, res) => {
  console.log("Signup user called ");

  // extract the required parameters from request
  const { name, email, password, username, mobile } = req.body;

  if (!name || !email || !password || !username || !mobile) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  // check if user already exists in our Database or not
  const userExists = await User.findOne({ email });

  // if user exist throw error
  if (userExists) {
    res.status(400);
    throw new Error("User with this email already exists");
  }

  sendEmailToUSer(name, email);

  // otherwise create a user with requested data
  const user = await User.create({
    name,
    email,
    password,
    username,
    mobile,
  });

  // if user creation is successfull, send resposne
  if (user) {
    res.status(201).json({
      message: "User Created Successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.username,
        mobile: user.mobile,
        token: generateToken(user._id),
      },
    });
  }
  // if some error occurred in creating a user
  else {
    res.status(400);
    throw new Error("Error Ocuured!");
  }
});

// /api/user/login
// POST
// controller to login a user
const loginUser = asyncHandler(async (req, res) => {
  console.log("Login user called ");

  // extracitng login information from request body
  const { email, password } = req.body;

  // finding user
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      message: "User Login Successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        mobile: user.mobile,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials!");
  }
});

module.exports = { signupUser, loginUser };
