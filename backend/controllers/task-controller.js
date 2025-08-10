const Task = require("../models/task");

const getTasks = async (req, res) => {
	try {
		const response = await Task.find({ owner: req.user._id });
		if (!response || response.length === 0) {
			return res.status(404).json({ msg: "No tasks found for this user." });
		}
		res.status(200).json({ msg: response });
	} catch (error) {
		console.log(`Tasks : ${error}`);
		res.status(500).json({ msg: "Internal Server Error" });
	}
};

const addTask = async (req, res) => {
	try {
		const { title, description, dueDate, category, priority } = req.body;

		const newTask = new Task({
			title,
			description,
			duedate: dueDate,
			category,
			priority,
			owner: req.user._id,
		});

		const savedTask = await newTask.save();

		res.status(201).json({ message: "Task added successfully", task: savedTask });
	} catch (error) {
		console.error("Error adding task:", error.message);
		res.status(500).json({ message: "Failed to add task" });
	}
};

const editTask = async (req, res) => {
	try {
		const taskId = req.params.id;
		const userId = req.user._id;
		const updatedData = req.body;

		const task = await Task.findById(taskId);
		if (!task) return res.status(404).json({ message: "Task not found" });

		if (task.owner.toString() !== userId.toString()) {
			return res.status(403).json({ message: "You can't edit this task" });
		}

		const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, {
			new: true,
		});

		res.status(200).json({ message: "Task updated", task: updatedTask });
	} catch (error) {
		console.error("Error editing task:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

const deleteTask = async (req, res) => {
	try {
		const taskId = req.params.id;
		const userId = req.user._id;
		const task = await Task.findById(taskId);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		if (task.owner.toString() !== userId.toString()) {
			return res.status(403).json({ message: "You don't own this task" });
		}

		await task.deleteOne();
		return res.status(200).json({ message: "Task deleted successfully" });
	} catch (error) {
		console.error("Error deleting task:", error.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const markTaskAsDone = async (req, res) => {
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, {
			completed: true,
		});
		if (!task) {
			return res.status(404).json({ error: "Task not found" });
		}
		res.status(200).json({ message: "Task marked as done" });
	} catch (err) {
		console.error("Error marking task as done:", err);
		res.status(500).json({ error: "Failed to update task" });
	}
};

const getCompletedTasks = async (req, res) => {
	try {
		const userId = req.user._id;
		const completedTasks = await Task.find({
			owner: userId,
			completed: true,
		}).sort({ duedate: 1 });

		res.status(200).json(completedTasks);
	} catch (err) {
		console.error("Error fetching completed tasks:", err);
		res.status(500).json({ error: "Error fetching completed tasks" });
	}
};

module.exports = {
	getTasks,
	addTask,
	editTask,
	deleteTask,
	markTaskAsDone,
	getCompletedTasks,
};