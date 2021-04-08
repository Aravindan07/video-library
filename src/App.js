import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<div className="app__container">
			<Navbar />
			<Sidebar />
			<main>
				<Routes>
					<Route path="/" element={<h2>Home Page</h2>} />
					<Route path="/my-playlists" element={<h2>PlayLists Page</h2>} />
					<Route path="/liked-videos" element={<h2>Liked Videos Page</h2>} />
					<Route path="/watch-later" element={<h2>Watch Later Page</h2>} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
