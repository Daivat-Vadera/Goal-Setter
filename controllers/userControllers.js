const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const saltRounds = 10;

// @desc    Register User
// @route   POST /api/goals
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  //Check Any Field Empty
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Please add all Fields");
  }

  //Check User Exists
  const userExits = await User.findOne({ email: req.body.email });

  if (userExits) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //Create User

  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  });
});

// @desc    Authenticate User
// @route   POST /api/goals/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne(
    { email: req.body.email },
    function (err, foundUser) {
      if (foundUser) {
        bcrypt.compare(
          req.body.password,
          foundUser.password,
          function (err, result) {
            if (result) {
              res.status(201).json({
                _id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                token: generateToken(foundUser._id),
              });
            } else {
              res.status(400);
              throw new Error("Invalid credential");
            }
          }
        );
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

// @desc    Get User Data
// @route   GEt /api/goals/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const authUser = await User.findById(req.user.id);

  res.status(200).json({
    id: authUser._id,
    name: authUser.name,
    email: authUser.email,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWB_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
