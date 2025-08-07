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

export default function Dashboard() {
	const [tasks, setTasks] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);
	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					"http://localhost:5174/api/data/dashboard",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const sortedTasks = res.data.msg.sort(
					(a, b) => b.priority - a.priority
				);
				setTasks(sortedTasks);
			} catch (err) {
				console.error("Failed to fetch tasks:", err);
			}
		};
		fetchTasks();
	}, []);

	const handleDelete = async (id) => {
		try {
			const token = localStorage.getItem("token");
			const URL = `http://localhost:5174/api/data/delete/${id}`;
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
			<div
				data-aos="zoom-in"
				className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-4 items-stretch"
			>
				{tasks.map((task) => (
					<Box
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
				))}
			</div>
			<br />
			<br />
			<br />
			<br />
		</>
	);
}
