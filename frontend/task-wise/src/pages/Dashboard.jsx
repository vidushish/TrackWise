import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const URL = "http://localhost:5174/api/data/dashboard";
				const res = await axios.get(URL);
				setTasks(res.data.msg);
			} catch (err) {
				console.error("Failed to fetch tasks:", err);
			}
		};
		fetchTasks();
	}, []);

	return (
		<>
			<br />
			<br />
			<h1 className="text-3xl text-center font-semibold">
				Good to See You! Let's Crush Some Tasks
			</h1>
			<br />
			<br />
			<br />
			<div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-4 items-stretch">
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
								<Typography sx={{ fontSize: 15 }} variant="body2">
									{task.description}
								</Typography>
								<Typography
									variant="caption"
									display="block"
									sx={{ mt: 1 }}
								>
									Priority:{" "}
									{task.priority === 1
										? "High"
										: task.priority === 2
										? "Medium"
										: "Low"}
								</Typography>
							</CardContent>
							<CardActions className="bg-purple-200 justify-between">
								<Button
									size="small"
									sx={{ color: "#6b22a2" }}
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
