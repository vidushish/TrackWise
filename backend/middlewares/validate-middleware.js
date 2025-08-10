const isValidEmail = (email) =>
	typeof email === "string" &&
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
	email.length <= 100;

const validateSignup = (req, res, next) => {
	try {
		const name = req.body.name?.trim();
		const email = req.body.email?.trim().toLowerCase();
		const password = req.body.password?.trim();

		if (!name || name.length < 2 || name.length > 255) {
			const error = new Error("Invalid name.");
			error.status = 400;
			error.extraDetails = "Name must be 2-255 characters long.";
			throw error;
		}

		if (!isValidEmail(email)) {
			const error = new Error("Invalid email.");
			error.status = 400;
			error.extraDetails = "Email must be valid and under 100 characters.";
			throw error;
		}

		if (!password || password.length < 8 || password.length > 128) {
			const error = new Error("Invalid password.");
			error.status = 400;
			error.extraDetails = "Password must be 8-128 characters long.";
			throw error;
		}

		req.body = { name, email, password };
		next();
	} catch (err) {
		next(err);
	}
};

const validateLogin = (req, res, next) => {
	try {
		const email = req.body.email?.trim().toLowerCase();
		const password = req.body.password?.trim();

		if (!isValidEmail(email)) {
			const error = new Error("Invalid email.");
			error.status = 400;
			error.extraDetails = "Email must be valid and properly formatted.";
			throw error;
		}

		if (!password || password.length < 8) {
			const error = new Error("Invalid password.");
			error.status = 400;
			error.extraDetails = "Password must be at least 8 characters.";
			throw error;
		}

		req.body = { email, password };
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = { validateSignup, validateLogin };