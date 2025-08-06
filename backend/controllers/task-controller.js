const Task = require("../models/task");

const Tasks = async (req, res) => {
	try {
        const response = await Task.find();
        if(!response){
            res.status(404).json({msg:"No task found."});
            return;
        }
        res.status(200).json({msg:response});
	} catch (error) {
		console.log(`Tasks : ${error}`);
	}
};

module.exports = Tasks;