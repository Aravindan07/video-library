import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import VideoListing from "./pages/VideoListing";
import "./App.css";

function App() {
	return (
		<div className="flex-col">
			<Navbar />
			<div className="main-container">
				<Routes>
					<Route path="/" element={<VideoListing />} />
					<Route path="/my-playlists" element={<h2>PlayLists Page</h2>} />
					<Route path="/liked-videos" element={<h2>Liked Videos Page</h2>} />
					<Route path="/watch-later" element={<h2>Watch Later Page</h2>} />
					<Route path="/my-account" element={<h2>My Account Page</h2>} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
