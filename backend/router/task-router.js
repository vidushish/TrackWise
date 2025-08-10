const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const {
	getTasks,
	addTask,
	editTask,
	deleteTask,
	markTaskAsDone,
	getCompletedTasks,
} = require("../controllers/task-controller");

router.get("/", authMiddleware, getTasks); // GET /api/data
router.get("/dashboard", authMiddleware, getTasks); // optional, if you want a separate endpoint
router.post("/addtask", authMiddleware, addTask);
router.put("/edit/:id", authMiddleware, editTask);
router.delete("/delete/:id", authMiddleware, deleteTask);
router.put("/done/:id", authMiddleware, markTaskAsDone);
router.get("/completed-tasks", authMiddleware, getCompletedTasks);

module.exports = router;