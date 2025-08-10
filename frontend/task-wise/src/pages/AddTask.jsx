import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function AddTask() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [category, setCategory] = useState("");
	const [priority, setPriority] = useState("");
	const [tasks, setTasks] = useState([]);
	const location = useLocation();

	const navigate = useNavigate();

	const fetchTasks = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await axios.get("http://localhost:5174/api/data", {
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

	useEffect(() => {
		fetchTasks();
	}, [location]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const taskData = {
			title,
			description,
			dueDate,
			category,
			priority: Number(priority),
		};

		try {
			const token = localStorage.getItem("token");
			const URL = "http://localhost:5174/api/data/addtask";
			const res = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(taskData),
			});

			if (!res.ok) throw new Error("Failed to add task");
			const result = await res.json();
			toast.success("Task added successfully!");

			setTitle("");
			setDescription("");
			setDueDate("");
			setCategory("");
			setPriority("");
			navigate("/dashboard");
		} catch (error) {
			console.error("Error submitting task:", error);
			toast.error("Error adding task.");
		}
	};
	return (
		<div className="mt-12 text-center">
			<h1 className="text-4xl font-semibold">
				One Task Closer to Success
			</h1>
			<br />
			<br />
			<form
				className="text-lg"
				onSubmit={handleSubmit}
			>
				<label
					className="text-xl font-semibold"
					htmlFor="standard-required"
				>
					Task Title :&nbsp;&nbsp;&nbsp;
				</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter Title"
					className="px-4 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
				/>
				<br />
				<br />
				<label
					className="text-xl font-semibold"
					htmlFor="outlined-textarea"
				>
					Description : &nbsp;&nbsp;&nbsp;
				</label>
				<TextField
					id="outlined-textarea"
					placeholder="Add details..."
					multiline
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<br />
				<br />
				<label
					className="text-xl font-semibold"
					htmlFor="dueDate"
				>
					Due Date : &nbsp;&nbsp;&nbsp;
				</label>
				<input
					type="date"
					id="dueDate"
					value={dueDate}
					onChange={(e) => setDueDate(e.target.value)}
				/>
				<br />
				<br />
				<label
					className="text-xl font-semibold"
					htmlFor="demo-simple-select"
				>
					Category :&nbsp;&nbsp;&nbsp;
				</label>
				<Select
					id="demo-simple-select"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					displayEmpty
					sx={{ width: 200 }}
				>
					<MenuItem
						value=""
						disabled
					>
						<em>Select Category</em>{" "}
					</MenuItem>
					<MenuItem value="Work">Work</MenuItem>
					<MenuItem value="Health">Health</MenuItem>
					<MenuItem value="Personal">Personal</MenuItem>
					<MenuItem value="Study">Study</MenuItem>
					<MenuItem value="Errands">Errands</MenuItem>
				</Select>
				<br />
				<br />
				<div className="flex flex-row items-center justify-center mt-4">
					<label
						className="text-xl font-semibold"
						htmlFor="priority"
					>
						Priority : &nbsp;&nbsp;&nbsp;
					</label>
					<RadioGroup
						row
						aria-labelledby="demo-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
					>
						<FormControlLabel
							value="1"
							control={<Radio />}
							label="Low"
						/>
						<FormControlLabel
							value="2"
							control={<Radio />}
							label="Medium"
						/>
						<FormControlLabel
							value="3"
							control={<Radio />}
							label="High"
						/>
					</RadioGroup>
				</div>
				<br />
				<br />
				<Button
					type="submit"
					sx={{
						backgroundColor: "#651fa5ff",
						width: "10rem",
						height: "3rem",
						fontSize: "1rem",
						transition: "all 0.3s ease-in-out",
						"&:hover": {
							backgroundColor: "#6b22a2ff",
							transform: "scale(1.05)",
						},
					}}
					variant="contained"
				>
					Submit
				</Button>
			</form>
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}
