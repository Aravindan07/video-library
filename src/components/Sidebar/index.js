import React from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants";
import "./styles.css";

function Sidebar() {
	return (
		<aside>
			<ul className="w100 font-18">
				{navLinks.map((link) => (
					<li
						key={link.name}
						className="list__item ls-1 mb-16 c-pointer sidepane-list-item selected"
					>
						<NavLink
							activeClassName="selected"
							className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
							to={link.path}
						>
							{link.name}
						</NavLink>
					</li>
				))}
			</ul>
		</aside>
	);
}

export default Sidebar;
