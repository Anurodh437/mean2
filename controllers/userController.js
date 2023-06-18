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
  const { name, email, password, mobile, pic } = req.body;

  if (!name || !email || !password || !mobile) {
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
    mobile,
    pic,
  });

  // if user creation is successfull, send resposne
  if (user) {
    res.status(201).json({
      message: "User Created Successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        pic: user.pic,
        token: generateToken(user._id),
      },
    });
  }
  // if some error occurred in creating a user
  else {
    res.status(400);
    throw new Error("Error Occured!");
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
        mobile: user.mobile,
        pic: user.pic,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials!");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

module.exports = { signupUser, loginUser, updateUserProfile };
