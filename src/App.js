import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
// import VideoListing from "./pages/VideoListing";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
	return (
		<div className="app__container">
			<Navbar />
			<Sidebar />
			<main className="padding-r24 padding-l24">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/my-playlists" element={<h2>PlayLists Page</h2>} />
					<Route path="/liked-videos" element={<h2>Liked Videos Page</h2>} />
					<Route path="/watch-later" element={<h2>Watch Later Page</h2>} />
					<Route path="/my-account" element={<h2>My Account Page</h2>} />
					<Route path="/video/:id" element={<VideoPage />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
