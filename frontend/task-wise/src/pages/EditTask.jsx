import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";

export default function EditTask() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [duedate, setDuedate] = useState("");
	const [category, setCategory] = useState("");
	const [priority, setPriority] = useState("");

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTask = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await fetch(`http://localhost:5174/api/data`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const data = await res.json();
				const task = data.msg.find((t) => t._id === id);
				if (!task) throw new Error("Task not found");

				setTitle(task.title);
				setDescription(task.description);
				setDuedate(task.duedate.slice(0, 10));
				setCategory(task.category);
				setPriority(String(task.priority));
			} catch (err) {
				console.error("Failed to load task:", err);
				toast.error("Failed to load task details");
			}
		};
		fetchTask();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const updatedTask = {
			title,
			description,
			duedate,
			category,
			priority: Number(priority),
		};

		try {
			const token = localStorage.getItem("token");
			const res = await fetch(`http://localhost:5174/api/data/edit/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatedTask),
			});

			if (!res.ok) throw new Error("Update failed");
			toast.success("Task updated successfully!");
			navigate("/dashboard");
		} catch (err) {
			console.error("Edit error:", err);
			toast.error("Failed to update task.");
		}
	};

	return (
		<div className="mt-12 text-center">
			<h1 className="text-4xl font-semibold">Update Your Task</h1>
			<br />
			<form className="text-lg" onSubmit={handleSubmit}>
				<label className="text-xl font-semibold">Task Title : </label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter Title"
					className="px-4 py-2 border border-gray-900 rounded-md"
				/>
				<br /><br />
				<label className="text-xl font-semibold">Description : </label>
				<TextField
					placeholder="Add details..."
					multiline
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<br /><br />
				<label className="text-xl font-semibold">Due Date : </label>
				<input
					type="date"
					value={duedate}
					 onChange={(e) => setDuedate(e.target.value)}
				/>
				<br /><br />
				<label className="text-xl font-semibold">Category : </label>
				<Select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					sx={{ width: 200 }}
				>
					<MenuItem value="Work">Work</MenuItem>
					<MenuItem value="Health">Health</MenuItem>
					<MenuItem value="Personal">Personal</MenuItem>
					<MenuItem value="Study">Study</MenuItem>
					<MenuItem value="Errands">Errands</MenuItem>
				</Select>
				<br /><br />
				<div className="flex flex-row items-center justify-center mt-4">
					<label className="text-xl font-semibold">Priority : </label>
					<RadioGroup
						row
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
					>
						<FormControlLabel value="1" control={<Radio />} label="Low" />
						<FormControlLabel value="2" control={<Radio />} label="Medium" />
						<FormControlLabel value="3" control={<Radio />} label="High" />
					</RadioGroup>
				</div>
				<br /><br />
				<Button
					type="submit"
					sx={{
						backgroundColor: "#651fa5ff",
						width: "10rem",
						height: "3rem",
						fontSize: "1rem",
						"&:hover": {
							backgroundColor: "#6b22a2ff",
							transform: "scale(1.05)",
						},
					}}
					variant="contained"
				>
					Update
				</Button>
			</form>
			<br /><br /><br /><br />
		</div>
	);
}
