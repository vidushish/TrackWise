const { z } = require("zod");

const signupSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Name must be at least 2 characters.")
		.max(255, "Name must be under 255 characters."),

	email: z
		.string()
		.trim()
		.toLowerCase()
		.email("Invalid email format.")
		.max(100, "Email must be under 100 characters."),

	password: z
		.string()
		.trim()
		.min(8, "Password must be at least 8 characters.")
		.max(128, "Password must be under 128 characters."),
});

const loginSchema = z.object({
	email: z.string().trim().toLowerCase().email("Invalid email format."),

	password: z
		.string()
		.trim()
		.min(8, "Password must be at least 8 characters."),
});

module.exports = { signupSchema, loginSchema };
