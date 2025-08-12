import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "aos/dist/aos.css";
import AOS from "aos";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
const baseURL = import.meta.env.VITE_API_BASE_URL;

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

export default function Analytics() {
	const [chartData, setChartData] = useState(null);
	const [completedCount, setCompletedCount] = useState(0);
	const [pendingCount, setPendingCount] = useState(0);
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("token");

		const fetchData = async () => {
			try {
				const completedRes = await axios.get(
					`${baseURL}/api/data/completed-tasks`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const completedTasks = completedRes.data || [];
				setCompletedCount(completedTasks.length);
				const allRes = await axios.get(
					`${baseURL}/api/data`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const allTasks = Array.isArray(allRes.data)
					? allRes.data
					: allRes.data.msg || [];
				const pendingTasks = allTasks.filter((t) => !t.completed);
				setPendingCount(pendingTasks.length);

				const dateMap = {};
				completedTasks.forEach((task) => {
					const date = task.completedAt
						? new Date(task.completedAt).toLocaleDateString()
						: new Date(task.duedate).toLocaleDateString();
					dateMap[date] = (dateMap[date] || 0) + 1;
				});

				const labels = Object.keys(dateMap);
				const dataPoints = Object.values(dateMap);

				if (labels.length === 0) {
					setChartData({
						labels: ["No tasks done yet"],
						datasets: [
							{
								label: "Completed Tasks",
								data: [0],
								borderColor: "#6b22a2",
								backgroundColor: "rgba(107, 34, 162, 0.2)",
								fill: true,
								tension: 0.4,
								pointRadius: 5,
								pointHoverRadius: 7,
								pointBackgroundColor: "#6b22a2",
							},
						],
					});
				} else {
					setChartData({
						labels,
						datasets: [
							{
								label: "Completed Tasks",
								data: dataPoints,
								borderColor: "#6b22a2",
								backgroundColor: (context) => {
									const ctx = context.chart.ctx;
									const gradient = ctx.createLinearGradient(
										0,
										0,
										0,
										300
									);
									gradient.addColorStop(
										0,
										"rgba(107, 34, 162, 0.4)"
									);
									gradient.addColorStop(
										1,
										"rgba(107, 34, 162, 0)"
									);
									return gradient;
								},
								fill: true,
								tension: 0.4,
								pointRadius: 5,
								pointHoverRadius: 7,
								pointBackgroundColor: "#6b22a2",
							},
						],
					});
				}
			} catch (err) {
				console.error("Failed to load analytics", err);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (chartData) {
			AOS.refresh();
		}
	}, [chartData]);
	return (
		<div>
			<br />
			<h1
				data-aos="fade-up"
				className="text-4xl text-center font-bold text-purple-800"
			>
				Visualize Your Journey. Optimize Your Routine.
			</h1>
			<br />
			<div
				data-aos="flip-up"
				className="w-full max-w-4xl mx-auto"
			>
				{chartData ? (
					<Line
						data={chartData}
						options={{
							responsive: true,
							animation: {
								duration: 1500,
								easing: "easeOutQuart",
							},
							animations: {
								y: {
									easing: "easeInOutElastic",
									from: (ctx) => {
										if (ctx.type === "data") {
											return 0;
										}
									},
									duration: 1200,
									delay: (ctx) => ctx.dataIndex * 200,
								},
							},
							plugins: {
								legend: {
									display: false,
									labels: {
										color: "#6b22a2",
										font: { size: 16, weight: "bold" },
									},
								},
								title: {
									display: true,
									text: "Task Completion Growth",
									color: "#6b22a2",
									font: { size: 20, weight: "bold" },
								},
							},
							scales: {
								x: {
									grid: { display: false },
									ticks: {
										color: "#6b22a2",
										font: { size: 14, weight: "bold" },
									},
									title: {
										display: true,
										text: "Date",
										color: "#6b22a2",
										font: { size: 16, weight: "bold" },
									},
								},
								y: {
									grid: { color: "rgba(107, 34, 162, 0.1)" },
									ticks: {
										color: "#6b22a2",
										font: { size: 14, weight: "bold" },
									},
									title: {
										display: true,
										text: "Number of Tasks",
										color: "#6b22a2",
										font: { size: 16, weight: "bold" },
									},
								},
							},
						}}
					/>
				) : (
					<p className="text-center text-purple-700 text-lg font-semibold">
						Loading chart...
					</p>
				)}
			</div>
			<div
				data-aos="fade-down"
				data-aos-easing="linear"
				data-aos-duration="1500"
				className="mt-10 w-full max-w-4xl mx-auto bg-purple-100 p-6 rounded-lg shadow-md text-center"
			>
				<h2 className="text-2xl font-bold text-purple-800 mb-4">
					Task Summary
				</h2>
				<p className="text-lg font-semibold text-green-700">
					✅ Completed Tasks: {completedCount}
				</p>
				<p className="text-lg font-semibold text-red-700">
					📌 Pending Tasks: {pendingCount}
				</p>
			</div>
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
					onClick={() => navigate("/dashboard")}
				>
				Go to Dashboard
				</Button>
			</div>

			<br />
			<br />
			<br />
		</div>
	);
}
