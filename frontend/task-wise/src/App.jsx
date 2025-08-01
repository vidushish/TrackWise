import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import HomePage from "../src/pages/HomePage";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import AddTask from "../src/pages/AddTask";
import Dashboard from "../src/pages/Dashboard";
import Analytics from "../src/pages/Analytics";
import { Routes, Route, useLocation } from "react-router-dom";
import { Axios } from "axios";
import { useState, useEffect } from "react";
function App() {
	const location = useLocation();
	const hideLayout =
		location.pathname === "/login" || location.pathname === "/signup";
	
	const [data,setData]=useState();

	const getData = async()=>{
		const response = await Axios.get("https://localhost:5174/getData");
		setData(response.data);
	}

	useEffect(()=>{
		getData();
	},[]);

	return (
		<>
			<div className="min-h-screen w-full bg-[#fafafa] relative text-gray-900">
				<div
					className="absolute inset-0 z-0 pointer-events-none"
					style={{
						backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
						backgroundSize: "40px 40px",
					}}
				/>
				<div className="relative z-10 text-black p-10">
					{!hideLayout && <Navbar />}

					<Routes>
						<Route
							path="/"
							element={<HomePage />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/signup"
							element={<Signup />}
						/>
						<Route
							path="/addtask"
							element={<AddTask />}
						/>
						<Route
							path="/dashboard"
							element={<Dashboard />}
						/>
						<Route
							path="/analytics"
							element={<Analytics />}
						/>
					</Routes>

					{!hideLayout && <Footer />}
				</div>
			</div>
		</>
	);
}

export default App;
