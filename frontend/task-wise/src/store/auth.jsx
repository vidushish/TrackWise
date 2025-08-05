import { useEffect, useState, createContext, useContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [isLoggedIn, setIsLoggedIn] = useState(!!token);
	const [user, setUser] = useState(null);

	const storeTokenInLS = (serverToken) => {
		localStorage.setItem("token", serverToken);
		setToken(serverToken);
		setIsLoggedIn(true);
	};

	const LogoutUser = () => {
		setToken("");
		setIsLoggedIn(false);
		localStorage.removeItem("token");
		setUser(null);
	};

	useEffect(() => {
		setIsLoggedIn(!!token); 
	}, [token]);

	return (
		<AuthContext.Provider value={{ storeTokenInLS, LogoutUser, token, isLoggedIn, user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const authContextValue = useContext(AuthContext);
	if (!authContextValue) {
		throw new Error("useAuth used outside of the Provider.");
	}
	return authContextValue;
};
