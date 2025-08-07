const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const getTasks = require("../controllers/task-controller");
const addTask = require("../controllers/add-task-controller");
const deleteTask = require("../controllers/delete-task-controller");
const editTask = require("../controllers/edit-task-controller");

router.get("/dashboard", authMiddleware, getTasks);
router.post("/addtask", authMiddleware, addTask);
router.delete("/delete/:id", authMiddleware, deleteTask);
router.put("/edit/:id", authMiddleware, editTask);

module.exports = router;
