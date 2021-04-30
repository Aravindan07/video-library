import React from "react";
import { Link } from "react-router-dom";
import { useVideoDataContext } from "../../context/videoDataContext";
import { ReactComponent as Logo } from "../../icons/movie-icon.svg";
import "./styles.css";

function Navbar() {
	const value = useVideoDataContext();
	console.log(value.state);
	return (
		<nav className="navbar navbar__list">
			<div className="flex-row-space-between w100">
				<Link className="navbar__title ls-1" to="/">
					<div className="nav-logo-container c-pointer">
						<Logo className="mr-8 logo" />
						CricTube
					</div>
				</Link>
				<div className="flex-row-space-between w40">
					{/* <Link className="font-color--white nav__links fw-600 ls-1 mr-16 ml-16" to="/">
						Home
					</Link> */}
					<Link to="/my-account">
						{/* <img
							className="avatar--medium rounded-image navbar-image"
							src="https://polish-ui.netlify.app/icons/fallback.svg"
							alt="Avatar"
							height="100%"
						/> */}
						<button className="button navbar--button font-color--white">Sign In</button>
					</Link>
					<Link to="/my-account">
						{/* <img
							className="avatar--medium rounded-image navbar-image"
							src="https://polish-ui.netlify.app/icons/fallback.svg"
							alt="Avatar"
							height="100%"
						/> */}
						<button className="button navbar--button ml-16 font-color--white">
							Register
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
