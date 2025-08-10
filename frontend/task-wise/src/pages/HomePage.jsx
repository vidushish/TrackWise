import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CardActionArea from "@mui/material/CardActionArea";

export default function HomePage() {
	const [columnCount, setColumnCount] = useState(3);

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});

		// Responsive column count based on screen size
		const updateColumns = () => {
			if (window.innerWidth >= 1024) {
				setColumnCount(3); // large
			} else if (window.innerWidth >= 768) {
				setColumnCount(2); // medium
			} else {
				setColumnCount(1); // small
			}
		};

		updateColumns();
		window.addEventListener("resize", updateColumns);
		return () => window.removeEventListener("resize", updateColumns);
	}, []);

	return (
		<>
			{/* Hero Section */}
			<div className="mt-[-1rem] grid grid-col-1 md:grid-cols-2 gap-50">
				<div
					data-aos="fade-up-right"
					className="mt-25 ml-7"
				>
					<h1 className="text-6xl font-bold">TrackWise - </h1>
					<br />
					<h2 className="text-3xl font-semibold">
						Simplify Your Routine, Amplify Your Results
					</h2>
					<br />
					<br />
					<br />
					<p className="text-lg tracking-wider  text-base/7 ">
						From goals to habits, everything is trackable. <br />
						<br />
						Get clarity, stay consistent, and achieve more every
						day.
					</p>
				</div>
				<div>
					<img
						data-aos="fade-up-left"
						className="h-[40rem] mt-[-3rem]"
						src="./public/images/homepage.webp"
						alt="HomePage"
					/>
				</div>
			</div>

			{/* Features Section */}
			<br />
			<div className="text-center">
				<h2
					data-aos="fade-up"
					data-aos-anchor-placement="top-bottom"
					className="text-2xl font-bold"
				>
					What You Can Do:
				</h2>
				<br />
				<br />
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 justify-items-center">
					{[
						{
							img: "/images/Create.jpg",
							text: "Create & manage daily tasks effortlessly",
							alt: "Create",
						},
						{
							img: "/images/Build.jpg",
							text: "Build habit streaks with custom routines",
							alt: "Build",
						},
						{
							img: "/images/Visualize.avif",
							text: "Visualize progress with interactive charts",
							alt: "Visualize",
						},
						{
							img: "/images/secure.jpg",
							text: "Secure login & personalized dashboard",
							alt: "Secure",
						},
					].map(({ img, text, alt }) => (
						<div
							key={alt}
							data-aos="flip-left"
							className="transition-transform hover:scale-105 duration-500 w-full max-w-xs"
						>
							<Card
								sx={{
									backgroundColor: "#d5b7f4ff",
									height: 280,
									display: "flex",
									flexDirection: "column",
								}}
							>
								<CardActionArea
									sx={{
										flex: 1,
										display: "flex",
										flexDirection: "column",
									}}
								>
									<CardMedia
										component="img"
										sx={{
											height: 200,
											width: "100%",
											objectFit: "fill",
										}}
										image={img}
										alt={alt}
									/>
									<CardContent
										sx={{
											flexGrow: 1,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											px: 2,
										}}
									>
										<Typography
											variant="body2"
											sx={{
												color: "#333",
												textAlign: "center",
												fontWeight: 600,
											}}
										>
											{text}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</div>
					))}
				</div>
			</div>

			{/* Call to Action */}
			<br />
			<br />
			<br />
			<div
				data-aos="fade-up"
				data-aos-anchor-placement="top-center"
				className="text-center bg-violet-100"
			>
				<br />
				<h1 className="text-4xl font-semibold">
					Take Control of Your Day with TrackWise
				</h1>
				<br />
				<p className="text-lg text-gray-700">
					Track Tasks • Build Habits • See Progress
				</p>
				<br />
				<br />
				<Button
					sx={{
						backgroundColor: "#873ccdff",
						transition: "all 0.3s ease-in-out",
						borderRadius: "0 50px 0 50px",
						padding: "10px",
						width: "15rem",
						"&:hover": {
							backgroundColor: "#6b22a2ff",
							transform: "scale(1.05)",
						},
					}}
					variant="contained"
				>
					<Link to="/signup">Get Started - It's Free</Link>
				</Button>
				<br />
				<br />
			</div>

			{/* Reviews Section */}
			<br />
			<br />
			<div
				data-aos="fade-up"
				data-aos-anchor-placement="top-bottom"
				className="text-center"
			>
				<h1 className="text-4xl font-semibold">
					Trusted by users across domains.
				</h1>
				<br />
				<p className="text-lg text-gray-700">
					Loved for simplicity. Evolving every day.
				</p>
				<br />

				<div className="bg-gradient-to-b from-purple-500 via-purple-200 to-purple-400 py-16 px-6">
					<h2 className="text-center text-4xl font-bold text-white mb-12">
						What Our Users Say
					</h2>

					{(() => {
						const reviews = [
							{
								name: "Aarav Mehta",
								role: "Startup Founder",
								review: "TrackWise completely changed how I manage my work. The habit tracker keeps me consistent, and the analytics are eye-opening!",
								rating: 5,
							},
							{
								name: "Priya Kapoor",
								role: "Content Creator",
								review: "I love how simple yet powerful TrackWise is. Planning my week takes minutes now. The charts keep me motivated!",
								rating: 4,
							},
							{
								name: "Rahul Sharma",
								role: "Software Developer",
								review: "Initially, I wasn’t sure I needed a task tracker, but TrackWise has saved me hours every week. The streaks feature is addictive!",
								rating: 5,
							},
							{
								name: "Ananya Verma",
								role: "Fitness Coach",
								review: "The habit tracker is a game-changer for me and my clients. Tracking routines has never been easier.",
								rating: 4,
							},
							{
								name: "Kunal Singh",
								role: "Student",
								review: "TrackWise keeps me on top of my assignments and personal goals. The reminders and dashboard are spot-on.",
								rating: 3,
							},
							{
								name: "Meera Iyer",
								role: "Project Manager",
								review: "This is hands down the most intuitive productivity app I’ve used. The UI is clean, and it just works.",
								rating: 5,
							},
							{
								name: "Saanvi Gupta",
								role: "Designer",
								review: "The interface is beautiful and user-friendly. It’s exactly what I needed to stay on track.",
								rating: 4,
							},
							{
								name: "Rohan Das",
								role: "Freelancer",
								review: "The reminders are a lifesaver. I’ve never missed a deadline since I started using TrackWise.",
								rating: 5,
							},
							{
								name: "Ishaan Khanna",
								role: "Entrepreneur",
								review: "Finally, a productivity tool that keeps things simple without removing powerful features.",
								rating: 4,
							},
							{
								name: "Vikram Patel",
								role: "Marketing Lead",
								review: "From task tracking to analytics, this tool has boosted my team's productivity big time.",
								rating: 5,
							},
							{
								name: "Neha Joshi",
								role: "Research Analyst",
								review: "Super clean interface and powerful features. I use it daily without fail.",
								rating: 4,
							},
							{
								name: "Arjun Rao",
								role: "Teacher",
								review: "Helps me organize classes, projects, and personal life all in one place.",
								rating: 4,
							},
						];

						const renderStars = (count) =>
							Array.from({ length: 5 }, (_, i) => (
								<span
									key={i}
									className={
										i < count
											? "text-yellow-400"
											: "text-gray-300"
									}
								>
									★
								</span>
							));

						const chunkSize = Math.ceil(
							reviews.length / columnCount
						);
						const reviewChunks = Array.from(
							{ length: columnCount },
							(_, i) =>
								reviews.slice(
									i * chunkSize,
									i * chunkSize + chunkSize
								)
						);

						return (
							<div
								className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
							>
								{reviewChunks.map((chunk, colIdx) => (
									<div
										key={colIdx}
										className="relative h-[400px] overflow-hidden group"
									>
										<div className="flex flex-col animate-scroll-vertical space-y-6 group-hover:[animation-play-state:paused]">
											{[...chunk, ...chunk].map(
												(
													{
														name,
														role,
														review,
														rating,
													},
													idx
												) => (
													<div
														key={idx}
														className="bg-purple-200 rounded-2xl p-6 shadow-lg text-gray-900 border border-purple-300 w-[90%] mx-auto transform transition-transform duration-300 group-hover:scale-105"
													>
														<div className="flex mb-4 text-lg">
															{renderStars(
																rating
															)}
														</div>
														<p className="mb-4 text-gray-700">
															{review}
														</p>
														<div>
															<p className="font-semibold">
																{name}
															</p>
															<p className="text-sm text-gray-500">
																{role}
															</p>
														</div>
													</div>
												)
											)}
										</div>
									</div>
								))}
							</div>
						);
					})()}
				</div>

				{/* Animation Style */}
				<style>{`
					@keyframes scrollVertical {
						0% { transform: translateY(0); }
						100% { transform: translateY(-50%); }
					}
					.animate-scroll-vertical {
						animation: scrollVertical 30s linear infinite;
					}
				`}</style>
			</div>

			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
}
