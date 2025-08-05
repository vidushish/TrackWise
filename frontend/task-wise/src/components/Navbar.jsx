import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import RunCircleTwoToneIcon from "@mui/icons-material/RunCircleTwoTone";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const pages = ["Dashboard", "Add Task", "Analytics"];

export default function Navbar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const { isLoggedIn, token, LogoutUser } = useAuth();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			if (!token) return;

			try {
				const URL = "http://localhost:5174/api/auth/user";
				const res = await fetch(URL, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await res.json();
				setUserData(data.user);
			} catch (err) {
				console.log("Failed to fetch user", err);
			}
		};

		fetchUser();
	}, [token]);

	return (
		<AppBar
			position="sticky"
			sx={{
				backgroundColor: "#351c4fff",
				mt: -2.5,
				borderRadius: "20px",
				boxShadow: 3,
				overflow: "hidden",
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<RunCircleTwoToneIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".2rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						TrackWise
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: "block", md: "none" } }}
						>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={() => {
										handleCloseNavMenu();
										if (page === "Dashboard")
											navigate("/dashboard");
										else if (page === "Add Task")
											navigate("/addtask");
										else if (page === "Analytics")
											navigate("/analytics");
									}}
									sx={{
										my: 2,
										color: "black",
										display: "block",
									}}
								>
									{page}
								</Button>
							))}
						</Menu>
					</Box>
					<RunCircleTwoToneIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						TrackWise
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={() => {
									handleCloseNavMenu();
									if (page === "Dashboard")
										navigate("/dashboard");
									else if (page === "Add Task")
										navigate("/addtask");
									else if (page === "Analytics")
										navigate("/analytics");
								}}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page}
							</Button>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar
									sx={{
										bgcolor: "grey.600",
										width: 40,
										height: 40,
									}}
								>
									<AccountCircleRoundedIcon
										sx={{ width: "100%", height: "100%" }}
									/>
								</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{isLoggedIn ? (
								<MenuItem
									key="logout"
									onClick={() => {
										handleCloseUserMenu();
										LogoutUser();
										navigate("/");
									}}
								>
									<Typography sx={{ textAlign: "center" }}>
										Logout
									</Typography>
								</MenuItem>
							) : (
								[
									<MenuItem
										key="login"
										onClick={() => {
											handleCloseUserMenu();
											navigate("/login");
										}}
									>
										<Typography
											sx={{ textAlign: "center" }}
										>
											Log In
										</Typography>
									</MenuItem>,

									<MenuItem
										key="signup"
										onClick={() => {
											handleCloseUserMenu();
											navigate("/signup");
										}}
									>
										<Typography
											sx={{ textAlign: "center" }}
										>
											Sign Up
										</Typography>
									</MenuItem>,
								]
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
