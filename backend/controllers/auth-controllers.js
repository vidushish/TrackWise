const home = async (req, res) => {
	try {
		res.status(200).send("welcome to home page");
	} catch (error) {
		console.log(error);
	}
};

const login = (req, res) => {
	try {
		res.status(200).send("welcom to login page");
	} catch (error) {
		console.log(error);
	}
};

module.exports = { home,login };
