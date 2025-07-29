import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CardActionArea from "@mui/material/CardActionArea";

export default function HomePage() {
	const navigate = useNavigate();

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);
	return (
		<>
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
					Add new Review
				</Button>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
}
