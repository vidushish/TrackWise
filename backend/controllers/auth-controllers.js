const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
	try {
		res.status(200).send("welcome to home page");
	} catch (error) {
		console.log(error);
	}
};

const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const userExist = await User.findOne({ email: email });
		if (userExist) {
			return res.status(400).json({ msg: "Email already exixts." });
		}

		const userCreate = await User.create({ name, email, password });

		res.status(201).json({
			msg: "Signup successfull!",
			token: await userCreate.generateToken(),
			userId: userCreate._id.toString(),
		});
	} catch (error) {
		console.log(error);
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const userExist = await User.findOne({ email });

		if (!userExist) {
			return res.status(400).json({ msg: "Invalid Credentials" });
		}

		const user = await userExist.comparePassword(password);

		if (user) {
			res.status(200).json({
				msg: "Login Successfull!",
				token: await userExist.generateToken(),
				userId: userExist._id.toString(),
			});
		} else {
			res.status(401).json({ msg: "Invalid email or password." });
		}
	} catch (error) {
		res.status(500).json("Internal server error!");
	}
};

module.exports = { home, signup, login };
