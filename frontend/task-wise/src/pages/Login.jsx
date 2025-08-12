import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const URL = `${baseURL}/api/auth/login`;
export default function LoginPage() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const { storeTokenInLS, isLoggedIn } = useAuth();
	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn]);
	const navigate = useNavigate();

	const handleInput = (event) => {
		let name = event.target.name;
		let value = event.target.value;

		setUser({
			...user,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(user),
			});
			const res_data = await response.json();
			if (response.ok) {
				storeTokenInLS(res_data.token);
				setUser({ email: "", password: "" });
				toast.success("Login Successful");
				navigate("/");
			} else {
				const errorMessage =
					res_data.message ||
					res_data.extraDetails || "Invalid Credentials";
				toast.error(errorMessage);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex  mt-[-40px] mb-[-40px]">
			<div className="hidden sm:block w-1/2">
				<img
					src="/images/LoginBackground.jpg"
					alt="Login Illustration"
					className="h-full w-full object-cover ml-[-40px]"
				/>
			</div>

			<div className=" flex w-full sm:w-1/2 justify-center items-center">
				<div className="w-full max-w-md p-6">
					<div className="text-center mb-8">
						<h1 className="text-4xl font-semibold">
							Welcome back!
						</h1>
						<br />
						<p className="tracking-wide text-lg">
							Consistency starts here. Log in and stay on track
							with TrackWise.
						</p>
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-4"
					>
						<input
							type="email"
							name="email"
							placeholder="name@email.com"
							value={user.email}
							onChange={handleInput}
							className="w-full px-4 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={user.password}
							onChange={handleInput}
							className="w-full px-4 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
						/>

						<div className="flex items-center justify-between text-sm">
							<label className="flex items-center">
								<input
									type="checkbox"
									className="mr-2"
								/>
								Remember me
							</label>
						</div>

						<button
							type="submit"
							className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
						>
							Log In
						</button>
					</form>

					<div className="text-center mt-4 text-sm">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="text-black font-semibold hover:underline"
						>
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
