const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");

const register = catchAsync(async (req, res) => {
  const data = await userService.createUser(req.body);
  const authToken = await tokenService.generateAuthTokens(data);
  res.status(201).send({
    user: data,
    tokens: authToken,
  });
});

const login = catchAsync(async (req, res) => {
  const user = await authService.loginUserWithEmailAndPassword(
    req.body.email,
    req.body.password
  );
  const authToken = await tokenService.generateAuthTokens(user);
  res.status(200).send({
    user: user,
    tokens: authToken,
  });
});

module.exports = {
  register,
  login,
};
