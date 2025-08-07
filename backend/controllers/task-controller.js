const Task = require("../models/task");

const Tasks = async (req, res) => {
	try {
		const response = await Task.find({ owner: req.user._id }); // 👈 Filter by user
		if (!response || response.length === 0) {
			return res.status(404).json({ msg: "No tasks found for this user." });
		}
		res.status(200).json({ msg: response });
	} catch (error) {
		console.log(`Tasks : ${error}`);
		res.status(500).json({ msg: "Internal Server Error" });
	}
};

module.exports = Tasks;