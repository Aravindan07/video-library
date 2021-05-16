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
	SavedVideosPage,
} from "./pages";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<PrivateRoute exact path="/users/:userId/my-playlists" element={<PlaylistsPage />} />
			<PrivateRoute exact path="/users/:userId/liked-videos" element={<LikedVideosPage />} />
			<PrivateRoute exact path="/users/:userId/watch-later" element={<WatchLaterPage />} />
			<PrivateRoute exact path="/users/:userId/saved-videos" element={<SavedVideosPage />} />
			<Route path="/my-account" element={<AccountPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/video/:videoId" element={<VideoPage />} />
			<PrivateRoute
				exact
				path="/users/:userId/my-playlists/:playlistId"
				element={<PlaylistVideosPage />}
			/>
		</Routes>
	);
}

export default AppRoutes;
