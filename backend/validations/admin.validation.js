const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userService = require("../services/user.service");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const adminValidation = catchAsync(async (req, res, next) => {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");
  const decoded = jwt.verify(token[1], config.jwt.secret);
  const user = await userService.getUserById(decoded.sub);
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "Access Denied");
  if (!user.isAdmin)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Access Denied");
  next();
});

module.exports = { adminValidation };
