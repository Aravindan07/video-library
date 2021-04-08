import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
	return (
		<aside>
			<ul className="w100 font-18">
				<li className="list__item ls-1 mb-16 c-pointer sidepane-list-item">
					<Link
						className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
						to="/"
					>
						Home
					</Link>
				</li>

				<li className="list__item ls-1 c-pointer sidepane-list-item mb-16">
					<Link
						className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
						to="/my-playlists"
					>
						Playlists
					</Link>
				</li>

				<li className="list__item ls-1 c-pointer sidepane-list-item mb-16">
					<Link
						className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
						to="/liked-videos"
					>
						Liked Videos
					</Link>
				</li>

				<li className="list__item ls-1 c-pointer sidepane-list-item mb-16">
					<Link
						className="link__item sidepane-list-item-active padding-t8 padding-b8 padding-l24 padding-r24"
						to="/watch-later"
					>
						Watch Later
					</Link>
				</li>
			</ul>
		</aside>
	);
}

export default Sidebar;
