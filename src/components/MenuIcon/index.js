import React from "react";
import { NavLink } from "react-router-dom";
import { CLOSE__MOBILE__MENU } from "../../constants";
import { useVideoDataContext } from "../../context/videoDataContext";
import { ReactComponent as CloseSidebarIcon } from "../../icons/close-sidebar.svg";

function MenuIcon() {
	const {
		state: { openMobileMenu },
		dispatch,
	} = useVideoDataContext();

	const closeSidebarHandler = () => {
		return dispatch({ type: CLOSE__MOBILE__MENU });
	};

	return (
		<>
			{openMobileMenu && (
				<div className="mobile-sidebar">
					<div className="close-icon-div">
						<CloseSidebarIcon
							className="c-pointer"
							id="close-sidebar-icon"
							onClick={closeSidebarHandler}
						/>
					</div>

					<ul className="w100 font-18">
						<li
							className="list__item ls-1 mb-16 c-pointer sidepane-list-item selected"
							onClick={closeSidebarHandler}
						>
							<NavLink
								activeClassName="selected"
								className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
								to="/"
							>
								Home
							</NavLink>
						</li>

						<li
							className="list__item ls-1 c-pointer sidepane-list-item mb-16 selected"
							onClick={closeSidebarHandler}
						>
							<NavLink
								activeClassName="selected"
								className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
								to="/my-playlists"
							>
								Playlists
							</NavLink>
						</li>

						<li
							className="list__item ls-1 c-pointer sidepane-list-item mb-16 selected"
							onClick={closeSidebarHandler}
						>
							<NavLink
								activeClassName="selected"
								className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
								to="/liked-videos"
							>
								Liked Videos
							</NavLink>
						</li>

						<li
							className="list__item ls-1 c-pointer sidepane-list-item mb-16 selected"
							onClick={closeSidebarHandler}
						>
							<NavLink
								activeClassName="selected"
								className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
								to="/watch-later"
							>
								Watch Later
							</NavLink>
						</li>
						<li
							className="list__item ls-1 c-pointer sidepane-list-item mb-16 selected"
							onClick={closeSidebarHandler}
						>
							<NavLink
								activeClassName="selected"
								className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
								to="/my-account"
							>
								My Account
							</NavLink>
						</li>
					</ul>
				</div>
			)}
		</>
	);
}

export default MenuIcon;
