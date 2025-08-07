const Task = require("../models/task");

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

module.exports = deleteTask;
