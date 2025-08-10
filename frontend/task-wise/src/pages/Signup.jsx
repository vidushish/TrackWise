import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

const URL = "http://localhost:5174/api/auth/signup";

export default function Signup() {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const { storeTokenInLS } = useAuth();

	const handleInput = (event) => {
		console.log(event);
		let name = event.target.name;
		let value = event.target.value;

		setUser({
			...user,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(user);
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(user),
			});
			const res_data = await response.json();
			console.log("Response from server", res_data);
			if (response.ok) {
				storeTokenInLS(res_data.token);
				setUser({ name: "", email: "", password: "" });
				toast.success("Signup Successful");
				navigate("/");
			}else{
				toast.error(res_data.extraDetails);
			}
		} catch (err) {
			console.log(err);
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

			<div className="flex w-full sm:w-1/2 justify-center items-center">
				<div className="w-full max-w-md p-6">
					<div className="text-center mb-8">
						<h1 className="text-4xl font-semibold">
							Create New Account!
						</h1>
						<br />
						<p className="tracking-wide text-lg">
							Get started with TrackWise – Your journey to smarter
							productivity begins here.
						</p>
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-4"
					>
						<input
							type="text"
							name="name"
							placeholder="Enter your name"
							className="w-full px-4 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
							value={user.name}
							onChange={handleInput}
						/>
						<input
							type="email"
							name="email"
							placeholder="name@email.com"
							className="w-full px-4 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
							value={user.email}
							onChange={handleInput}
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							className="w-full px-4 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
							value={user.password}
							onChange={handleInput}
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
							Sign Up
						</button>
					</form>

					<div className="text-center mt-4 text-sm">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-black font-semibold hover:underline"
						>
							Log In
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
