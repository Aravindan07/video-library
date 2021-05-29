import { useEffect } from "react";
import { Navbar, Sidebar, Modal, Loader } from "./components";
import { useVideoDataContext } from "./context/videoDataContext";
import { useMediaQuery } from "./utils/useMediaQueries";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes";
import "./App.css";

function App() {
	const { loadVideosData, loadUser, state } = useVideoDataContext();

	useEffect(() => {
		loadUser();
		loadVideosData();
	}, []);

	const [width] = useMediaQuery();

	toast.configure();

	return (
		<div className="app__container">
			<Navbar />
			{state.isLoading && <Loader />}
			<Sidebar />
			<Modal />
			<ToastContainer />
			<main
				className={`${width <= 410 ? "padding-r8 padding-l8" : "padding-r24 padding-l24"} ${
					width <= 520 && "mt-16"
				}`}
			>
				<AppRoutes />
			</main>
		</div>
	);
}

export default App;
