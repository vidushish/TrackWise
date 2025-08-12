import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
	const [tasks, setTasks] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(`${baseURL}/api/data`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				const allTasks = Array.isArray(res.data)
					? res.data
					: res.data.msg || [];

				const incompleteTasks = allTasks.filter((t) => !t.completed);

				const sortedTasks = incompleteTasks.sort(
					(a, b) => b.priority - a.priority
				);
				setTasks(sortedTasks);
			} catch (err) {
				console.error("Failed to fetch tasks:", err);
			}
		};
		fetchTasks();
	}, []);

	const handleDone = async (id) => {
		try {
			const token = localStorage.getItem("token");
			const URL = `${baseURL}/api/data/done/${id}`;
			const res = await axios.put(
				URL,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (res.status === 200 || res.status === 201) {
				setTasks((prev) => prev.filter((task) => task._id !== id));

				toast.success("Task marked as completed!");
				navigate("/analytics", { state: { refresh: true } });
			} else {
				toast.error("Failed to complete task");
			}
		} catch (err) {
			console.error("Failed to mark task as done:", err);
			toast.error("Failed to complete task");
		}
	};

	const handleDelete = async (id) => {
		try {
			const token = localStorage.getItem("token");
			const URL = `${baseURL}/api/data/delete/${id}`;
			const res = await axios.delete(URL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.status === 200) {
				setTasks((prev) => prev.filter((task) => task._id !== id));
				toast.success("Task deleted successfully");
			}
		} catch (err) {
			console.error("Failed to delete task:", err);
		}
	};

	return (
		<>
			<br />
			<br />
			<h1
				data-aos="fade-up"
				className="text-3xl text-center font-semibold"
			>
				Good to See You! Let's Crush Some Tasks
			</h1>
			<br />
			<br />
			<br />
			<div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-4 items-stretch">
				{tasks.length === 0 ? (
					<div
						className="col-span-full text-center text-lg text-gray-500"
						data-aos="fade-up"
					>
						No tasks yet. Add your first task!
					</div>
				) : (
					tasks.map((task) => (
						<Box
							data-aos="zoom-in"
							key={task._id}
							sx={{ minWidth: 275, height: "100%" }}
						>
							<Card
								variant="outlined"
								sx={{
									display: "flex",
									flexDirection: "column",
									height: "100%",
								}}
							>
								<CardContent
									className="bg-purple-200"
									sx={{ flexGrow: 1 }}
								>
									<Typography
										sx={{ fontSize: 14 }}
										color="text.secondary"
										gutterBottom
									>
										Category: {task.category}
									</Typography>
									<Typography
										variant="h5"
										component="div"
									>
										{task.title}
									</Typography>
									<Typography
										sx={{ mb: 1.5 }}
										color="text.secondary"
									>
										Due:{" "}
										{new Date(
											task.duedate
										).toLocaleDateString()}
									</Typography>
									<Typography
										sx={{ fontSize: 15 }}
										variant="body2"
									>
										{task.description}
									</Typography>
									<Typography
										variant="caption"
										display="block"
										sx={{ mt: 1 }}
									>
										Priority:{" "}
										{task.priority === 1
											? "Low"
											: task.priority === 2
											? "Medium"
											: "High"}
									</Typography>
								</CardContent>
								<CardActions className="bg-purple-200 justify-between">
									<Button
										size="small"
										sx={{ color: "#6b22a2" }}
										onClick={() =>
											navigate(`/edit/${task._id}`)
										}
									>
										Edit
									</Button>
									<Button
										size="small"
										sx={{ color: "#6b22a2" }}
										onClick={() => handleDone(task._id)}
									>
										Done
									</Button>
									<Button
										size="small"
										sx={{ color: "#6b22a2" }}
										onClick={() => handleDelete(task._id)}
									>
										Delete
									</Button>
								</CardActions>
							</Card>
						</Box>
					))
				)}
			</div>
			<br />
			<br />
			<br />
			<div className="flex justify-center mt-10">
				<Button
					sx={{
						backgroundColor: "#873ccdff",
						transition: "all 0.3s ease-in-out",
						fontSize: "1.05rem",
						fontWeight: "bold",
						padding: "10px 20px",
						borderRadius: "8px",
						textTransform: "none",
						"&:hover": {
							backgroundColor: "#6b22a2ff",
							transform: "scale(1.05)",
						},
					}}
					variant="contained"
					onClick={() => navigate("/addtask")}
				>
					Add new task
				</Button>
			</div>
			<br />
			<br />
			<br />
			<br />
		</>
	);
}
