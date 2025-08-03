import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

export default function NotFound() {
	return (
		<>
			<br />
			<br />
			<br />
			<div>
				<div className="text-center">
					<h1 className="text-9xl font-bold tracking-widest text-purple-900">404</h1>
					<br />
					<h4 className="text-5xl">Sorry! Page not found</h4>
					<br />
					<p className="text-lg tracking-wide">
						Oops! It seems like the page you're trying to access
						doesn't exist. If you believe there's an issue, feel
						free to report it, and we'll look into it.
					</p>
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
						<NavLink to="/">Back to home page</NavLink>
					</Button>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
			</div>
		</>
	);
}
