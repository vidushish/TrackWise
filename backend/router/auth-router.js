const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controllers.js");
const {
	validateSignup,
	validateLogin,
} = require("../middlewares/validate-middleware.js");

router.route("/").get(authcontrollers.home);
router.route("/signup").post(validateSignup, authcontrollers.signup);
router.route("/login").post(validateLogin, authcontrollers.login);

module.exports = router;
