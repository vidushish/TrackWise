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
			<div className="min-h-screen w-full bg-[#fafafa] relative text-gray-900">
    {/* Diagonal Grid with Light */}
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
					</Routes>

					{!hideLayout && <Footer />}
				</div>
			</div>
		</>
	);
}

export default App;
