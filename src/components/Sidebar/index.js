import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

function Sidebar() {
	return (
		<aside>
			<ul className="w100 font-18">
				<li className="list__item ls-1 mb-16 c-pointer sidepane-list-item selected">
					<NavLink
						activeClassName="selected"
						className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
						to="/"
					>
						Home
					</NavLink>
				</li>

				<li className="list__item ls-1 c-pointer sidepane-list-item mb-16 selected">
					<NavLink
						activeClassName="selected"
						className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
						to="/my-playlists"
					>
						Playlists
					</NavLink>
				</li>

				<li className="list__item ls-1 c-pointer sidepane-list-item mb-16 selected">
					<NavLink
						activeClassName="selected"
						className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
						to="/liked-videos"
					>
						Liked Videos
					</NavLink>
				</li>

				<li className="list__item ls-1 c-pointer sidepane-list-item mb-16 selected">
					<NavLink
						activeClassName="selected"
						className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
						to="/watch-later"
					>
						Watch Later
					</NavLink>
				</li>
				<li className="list__item ls-1 c-pointer sidepane-list-item mb-16 selected">
					<NavLink
						activeClassName="selected"
						className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
						to="/my-account"
					>
						My Account
					</NavLink>
				</li>
			</ul>
		</aside>
	);
}

export default Sidebar;
