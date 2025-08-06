import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function ProtectedRoute({ children }) {
	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	return children;
}