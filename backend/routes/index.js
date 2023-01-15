const express = require("express");
const authRoute = require("./auth.route");
const petRoute = require("./pet.route");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/pet", petRoute);

module.exports = router;
