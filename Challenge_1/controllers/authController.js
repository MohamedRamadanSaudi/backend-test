const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password'
    });
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password'
    });
  }

  // Increment token version
  user.tokenVersion = (user.tokenVersion || 0) + 1;
  await user.save({ validateBeforeSave: false });

  // Generate token with tokenVersion
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      tokenVersion: user.tokenVersion  // Include tokenVersion in token
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Remove password from output
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token
  });
});

exports.createUser = catchAsync(async (req, res, next) => {

  // Check if user already exists
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      status: 'fail',
      message: 'User with this email already exists'
    });
  }

  const newUser = await User.create(req.body);

  console.log(newUser);

  // Remove password from output
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { user: newUser }
  });
});

exports.seedAdmin = catchAsync(async (req, res, next) => {

  const admin = await User.findOne({ email: 'admin@admin.com' });

  if (admin) {
    return res.status(400).json({
      status: 'fail',
      message: 'Admin with this email already exists, you can create a new admin with a different email in create user route by providing the role as admin'
    });
  }

  const newAdmin = await User.create({
    name: 'Admin',
    email: 'admin@admin.com',
    password: process.env.ADMIN_PASSWORD,
    role: 'admin'
  });

  newAdmin.password = undefined;



  res.status(201).json({
    status: 'success',
    data: { user: newAdmin }
  });
});
