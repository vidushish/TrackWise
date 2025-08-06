const express = require("express");
const router = express.Router();
const tasks = require("../controllers/task-controller");

router.route("/dashboard").get(tasks);

module.exports = router;