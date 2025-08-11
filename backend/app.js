const express = require("express");
const app = express();
const router = require("./router/auth-router.js");
const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
const cors = require("cors");
const taskRouter = require("./router/task-router.js");
const path = require("path");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", router);
app.use("/api/data", taskRouter);

app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, "../frontend/task-wise/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/task-wise/dist/index.html"));
});

const PORT = process.env.PORT || 5174;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
