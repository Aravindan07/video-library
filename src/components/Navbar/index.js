import React from "react";
import { Link } from "react-router-dom";
import { useVideoDataContext } from "../../context/videoDataContext";
import { ReactComponent as Logo } from "../../icons/movie-icon.svg";
import { ReactComponent as MobileMenuIcon } from "../../icons/menu-icon.svg";
import { OPEN__MOBILE__MENU } from "../../constants";
import { useMediaQuery } from "../../utils/useMediaQueries";
import "./styles.css";

function Navbar() {
	const { state, dispatch } = useVideoDataContext();
	console.log(state, "state");

	const [width] = useMediaQuery();

	const openMobileMenuHandler = () => {
		return dispatch({ type: OPEN__MOBILE__MENU });
	};

	return (
		<nav className="navbar navbar__list">
			<MobileMenuIcon
				id="open-sidebar-icon"
				className="nav__image c-pointer menu-icon-size"
				onClick={openMobileMenuHandler}
			/>
			<div
				className={`flex-row-space-between w100 ${
					width <= 410 ? "flex-row-justify-center" : ""
				}`}
			>
				<Link className="navbar__title ls-1" to="/">
					<div className="nav-logo-container c-pointer">
						<Logo className="mr-8 logo" />
						CricTube
					</div>
				</Link>
				<div className={`flex-row-space-between w40 ${width <= 410 ? "mt-8" : ""}`}>
					<Link to="/my-account">
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
