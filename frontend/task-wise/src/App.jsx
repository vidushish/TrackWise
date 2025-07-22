import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import HomePage from "../src/pages/HomePage";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
	const location = useLocation();
	const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";
	return (
		<>
			<div className="min-h-screen w-full bg-white relative">
				<div
					className="absolute inset-0 z-0"
					style={{
						background: "white",
						backgroundImage: `
       linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
       linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
       radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
     `,
						backgroundSize: "32px 32px, 32px 32px, 100% 100%",
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
					</Routes>

					{!hideLayout && <Footer />}
				</div>
			</div>
		</>
	);
}

export default App;
