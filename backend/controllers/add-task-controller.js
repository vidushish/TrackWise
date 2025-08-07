const Task = require("../models/task");

const addTask = async (req, res) => {
	try {
		const { title, description, dueDate, category, priority } = req.body;

		const newTask = new Task({
			title,
			description,
			duedate: dueDate,
			category,
			priority,
			owner: req.user._id,  // 👈 Set the current logged-in user's ID
		});

		const savedTask = await newTask.save();

		res.status(201).json({ message: "Task added successfully", task: savedTask });
	} catch (error) {
		console.error("Error adding task:", error.message);
		res.status(500).json({ message: "Failed to add task" });
	}
};

module.exports = addTask;