import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./privateRoutes";
import {
	HomePage,
	VideoPage,
	LikedVideosPage,
	PlaylistsPage,
	PlaylistVideosPage,
	WatchLaterPage,
	AccountPage,
	RegisterPage,
} from "./pages";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<PrivateRoute exact path="/my-playlists" element={<PlaylistsPage />} />
			<PrivateRoute exact path="/liked-videos" element={<LikedVideosPage />} />
			<PrivateRoute exact path="/watch-later" element={<WatchLaterPage />} />
			<Route path="/my-account" element={<AccountPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/video/:videoId" element={<VideoPage />} />
			<PrivateRoute exact path="/my-playlists/:playlistId" element={<PlaylistVideosPage />} />
		</Routes>
	);
}

export default AppRoutes;
