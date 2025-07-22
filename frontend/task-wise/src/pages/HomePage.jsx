import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import CardActionArea from "@mui/material/CardActionArea";

export default function HomePage() {
	return (
		<>
			<div className="mt-[-1rem] grid grid-col-1 md:grid-cols-2 gap-50">
				<div className="mt-25 ml-7">
					<h1 className="text-6xl font-bold">TrackWise - </h1>
					<br />
					<h2 className="text-3xl font-bold">
						Simplify Your Routine, Amplify Your Results
					</h2>
					<br />
					<br />
					<br />
					<p className="text-lg tracking-wider  text-base/7 ">
						From goals to habits, everything is trackable. <br /><br />
Get clarity, stay consistent, and achieve more every day.
					</p>
				</div>
				<div>
					<img
						className="h-[40rem] mt-[-3rem]"
						src="./public/images/homepage.webp"
						alt="HomePage"
					/>
				</div>
			</div>
			<br />
			<div className="text-center">
				<h2 className="text-2xl font-bold">What You Can Do:</h2>
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
							className="w-full max-w-xs"
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
		</>
	);
}
