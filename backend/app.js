const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/index.js");
const { errorHandler } = require("./middlewares/error");
// const ApiError = require("./utils/ApiError");
const { jwtStrategy } = require("./config/passport");
const helmet = require("helmet");
const passport = require("passport");

const app = express();

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/images", express.static("images"));

// Reroute all API request starting with "/v1" route
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(404).send("Not found");
});

// handle error
app.use(errorHandler);

module.exports = app;
