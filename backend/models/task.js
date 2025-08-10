const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		maxlength: 1000,
	},
	duedate: {
		type: Date,
		default: Date.now(),
	},
	category: {
		type: String,
		required: true,
	},
	priority: { type: Number, min: 1, max: 3 },
	completed: { type: Boolean, default: false },
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});


const task = mongoose.model("Task", taskSchema);
module.exports = task;
