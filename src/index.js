import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import VideoDataContextProvider from "./context/videoDataContext";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<VideoDataContextProvider>
				<App />
			</VideoDataContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
