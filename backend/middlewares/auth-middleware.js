const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
	const tokenHeader = req.headers.authorization;

	if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ message: "Unauthorized - No token provided" });
	}

	console.log("token from auth middleware", tokenHeader);

	const token = tokenHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error("Error verifying token:", error.message);
		return res
			.status(401)
			.json({ message: "Unauthorized - Invalid token" });
	}
};

module.exports = authMiddleware;
