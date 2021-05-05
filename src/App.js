import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
// import VideoListing from "./pages/VideoListing";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import Sidebar from "./components/Sidebar";
import LikedVideosPage from "./pages/LikedVideos";
import PlayListsPage from "./pages/Playlists";
import PlaylistVideosPage from "./pages/PlaylistVideosPage";
import ModalComponent from "./components/Modal";
import MenuIcon from "./components/MenuIcon";
import WatchLaterPage from "./pages/WatchLaterPage";
import { useVideoDataContext } from "./context/videoDataContext";
import { useMediaQuery } from "./utils/useMediaQueries";
import "./App.css";

function App() {
	const { loadVideosData } = useVideoDataContext();

	useEffect(() => {
		loadVideosData();
	}, []);

	const [width] = useMediaQuery();

	return (
		<div className="app__container">
			<Navbar />
			<MenuIcon />
			<Sidebar />
			<ModalComponent />
			<main
				className={`${width <= 410 ? "padding-r8 padding-l8" : "padding-r24 padding-l24"} ${
					width <= 520 && "mt-16"
				}`}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/my-playlists" element={<PlayListsPage />} />
					<Route path="/liked-videos" element={<LikedVideosPage />} />
					<Route path="/watch-later" element={<WatchLaterPage />} />
					<Route
						path="/my-account"
						element={<h2 className="mt-16">My Account Page</h2>}
					/>
					<Route path="/video/:videoId" element={<VideoPage />} />
					<Route path="/my-playlists/:playlistId" element={<PlaylistVideosPage />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
