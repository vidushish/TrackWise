import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Analytics() {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			localStorage.setItem("redirectAfterLogin", "/analytics");
			navigate("/login");
			return;
		}

		const fetchTasks = async () => {
			try {
				const res = await axios.get("http://localhost:5174/tasks", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setTasks(res.data);
			} catch (err) {
				console.error("Error:", err);
				localStorage.removeItem("token");
				navigate("/login");
			}
		};

		fetchTasks();
	}, [navigate]);

	return (
		<div>
			<br />
			<br />
			<h1 className="text-3xl text-center font-semibold">
				Visualize Your Journey. Optimize Your Routine.
			</h1>
			<br />
			<br />
		</div>
	);
}
