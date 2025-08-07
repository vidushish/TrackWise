const Task = require("../models/task");

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

module.exports = editTask;
