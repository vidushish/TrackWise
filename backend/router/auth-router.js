const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controllers.js")

router.route("/").get(authcontrollers.home);

router.route("/login").get(authcontrollers.login);

module.exports = router;
