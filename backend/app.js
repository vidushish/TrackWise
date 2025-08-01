const express = require("express");
const app = express();
const router = require("./router/auth-router.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());

const cors = require("cors");
app.use(cors());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log("Connection error:", err));

require("./models/user");
require("./models/task");
require("./models/review");

app.use("/api/auth", router);

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
