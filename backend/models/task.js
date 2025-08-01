const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const taskSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
    duedate:{
        type:Date,
        default:Date.now(),
    },
	category: {
		type: String,
		required: true,
	},
	priority: { type: Number, min: 1, max: 3 },
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "Review",
		},
	],
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

taskSchema.post("findOneAndDelete", async (task) => {
	if (task) {
		await Review.deleteMany({ _id: { $in: task.reviews } });
	}
});

const task = mongoose.model("Task", taskSchema);
module.exports = task;
