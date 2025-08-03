import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function AddTask() {
	const [category, setCategory] = useState("");

	const handleCategoryChange = (event) => {
		setCategory(event.target.value);
	};
	return (
		<div className="mt-12 text-center">
			<h1 className="text-4xl font-semibold">
				One Task Closer to Success
			</h1>
			<br />
			<br />
			<form className="text-lg">
				<label htmlFor="standard-required">
					Task Title :&nbsp;&nbsp;&nbsp;
				</label>
				<input
					type="text"
					placeholder="Enter Title"
					className="px-4 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
				/>
				<br />
				<br />
				<label htmlFor="dueDate">Due Date : &nbsp;&nbsp;&nbsp;</label>
				<input
					type="date"
					id="dueDate"
				/>
				<br />
				<br />
				<label htmlFor="demo-simple-select">
					Category :&nbsp;&nbsp;&nbsp;
				</label>
				<Select
					id="demo-simple-select"
					value={category}
					onChange={handleCategoryChange}
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
					<label htmlFor="priority">
						Priority : &nbsp;&nbsp;&nbsp;
					</label>
					<RadioGroup
						row
						aria-labelledby="demo-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
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
					sx={{
						backgroundColor: "#873ccdff",
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
