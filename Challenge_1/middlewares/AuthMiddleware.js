const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const auth = catchAsync(async (req, res, next) => {
  // 1) Getting token from header
  if (!req.headers.authorization?.startsWith('Bearer')) {
    return next(new AppError('No token provided. Please log in.', 401));
  }

  const token = req.headers.authorization.split(' ')[1];

  // 2) Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  // 4) Check if token version matches
  if (decoded.tokenVersion !== currentUser.tokenVersion) {
    return next(new AppError('Token is no longer valid. Please login again.', 401));
  }

  // 5) Grant access to protected route
  req.user = currentUser;
  next();
});

const isAdmin = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new AppError("Admin access denied", 403));
  }
  next();
});

module.exports = { auth, isAdmin };
