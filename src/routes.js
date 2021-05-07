import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./privateRoutes";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import LikedVideosPage from "./pages/LikedVideos";
import PlayListsPage from "./pages/Playlists";
import PlaylistVideosPage from "./pages/PlaylistVideosPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import AccountPage from "./pages/Accountpage";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<PrivateRoute exact path="/my-playlists" element={<PlayListsPage />} />
			<PrivateRoute exact path="/liked-videos" element={<LikedVideosPage />} />
			<PrivateRoute exact path="/watch-later" element={<WatchLaterPage />} />
			<Route path="/my-account" element={<AccountPage />} />
			<Route path="/video/:videoId" element={<VideoPage />} />
			<PrivateRoute exact path="/my-playlists/:playlistId" element={<PlaylistVideosPage />} />
		</Routes>
	);
}

export default AppRoutes;
