export default function Signup() {
	return (
		<div className="ml-[-40px] mt-[-40px] mb-[-40px] flex justify-between">
			<div>
				<img
					style={{
						width: "80%",
						height: "auto",
						objectFit: "cover",
					}}
					src="./public/images/LoginBackground.jpg"
					alt=""
				/>
			</div>
			<div className="ml-[-2rem] mt-16">
				<h1 className="text-4xl font-semibold">Create New Account!</h1><br />
				<p className="tracking-wide text-lg">
					Get started with TrackWise – Your journey to smarter
					productivity begins here.
				</p>{" "}
			</div>
		</div>
	);
}
