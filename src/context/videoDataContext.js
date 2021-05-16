import { createContext, useContext, useReducer } from "react";
import { videoDataReducer } from "../reducers/videoDataReducer";
import * as Actions from "../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

const { REACT_APP_BACKEND_URL } = process.env;

export const TokenConfig = () => {
	//Get token from localStorage
	const token = localStorage.getItem("token");
	// const token = getState().authentication.token;

	//Headers
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	//If token add to headers
	if (token) {
		config.headers["x-auth-token"] = token;
	}

	return config;
};

export const VideoDataContext = createContext();

export default function VideoDataProvider({ children }) {
	let navigate = useNavigate();
	const [state, dispatch] = useReducer(videoDataReducer, Actions.initialState);

	const loadVideosData = async () => {
		try {
			const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/videos`);
			console.log("data in videos", data);
			dispatch({ type: Actions.LOAD__VIDEOS__DATA, payload: data });
		} catch (error) {
			console.error(error);
		}
	};

	const loadUser = async () => {
		try {
			const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/users`, TokenConfig());
			console.log("Data from load", data);
			dispatch({ type: Actions.LOAD__USER, payload: data });
		} catch (error) {
			console.error(error);
		}
	};

	const logInUser = async (email, password) => {
		try {
			const { data } = await axios.post(`${REACT_APP_BACKEND_URL}/users/login`, {
				email,
				password,
			});
			console.log(data);
			dispatch({ type: Actions.SET__LOGIN, payload: data });
			toast.success("Logged in successfully", {
				style: { backgroundColor: "##15b996" },
				autoClose: 2000,
				hideProgressBar: true,
			});
			return navigate(state.from ? state.from : "/");
		} catch (error) {
			console.error(error);
			return toast.error("Invalid Credentials", {
				style: { backgroundColor: "#b91538" },
				autoClose: 2000,
				hideProgressBar: true,
			});
		}
	};

	const registerUser = async (email, password) => {
		try {
			const { data } = await axios.post(`${REACT_APP_BACKEND_URL}/users/signup`, {
				email,
				password,
			});
			console.log(data);
			dispatch({ type: Actions.SET__SIGNUP, payload: data });
			toast.success("User registered successfully", {
				style: { backgroundColor: "##15b996" },
				autoClose: 2000,
				hideProgressBar: true,
			});
			return navigate(state.from ? state.from : "/");
		} catch (error) {
			console.error(error);
		}
	};

	const likeClickHandler = async (userId, videoId) => {
		const { data } = await axios.post(
			`${REACT_APP_BACKEND_URL}/videos/${userId}/${videoId}/like`,
			{ userId, videoId },
			TokenConfig()
		);
		console.log("Data after like", data);
		dispatch({ type: Actions.ADD__TO__LIKED__VIDEOS, payload: data });
	};

	// const addVideoToLikedVideos = (item) => {
	// 	dispatch({ type: Actions.ADD__TO__LIKED__VIDEOS, payload: item });
	// 	if (item.liked) {
	// 		return toast.success("Item added to liked videos", {
	// 			style: { backgroundColor: "var(--complementary-color)" },
	// 			autoClose: 1500,
	// 			hideProgressBar: true,
	// 		});
	// 	}
	// 	return toast.info("Item removed from liked videos", {
	// 		style: { backgroundColor: "#dcdcdc", color: "var(--font-color)" },
	// 		autoClose: 1500,
	// 		hideProgressBar: true,
	// 	});
	// };

	const dislikeClickHandler = async (userId, videoId) => {
		const { data } = await axios.post(
			`${REACT_APP_BACKEND_URL}/videos/${userId}/${videoId}/dislike`,
			{ userId, videoId },
			TokenConfig()
		);
		console.log("Data after dislike", data);
		dispatch({ type: Actions.CLICKED__ON__DISLIKE, payload: data });
	};

	const addOrRemoveFromWatchLater = async (userId, videoId) => {
		const { data } = await axios.post(
			`${REACT_APP_BACKEND_URL}/users/${userId}/watch-later`,
			{ userId, videoId },
			TokenConfig()
		);
		dispatch({ type: Actions.ADD__OR__REMOVE__VIDEO__FROM__WATCHLATER, payload: data });
	};

	const addOrRemoveFromSavedVideos = async (userId, videoId) => {
		const { data } = await axios.post(
			`${REACT_APP_BACKEND_URL}/users/${userId}/save-videos`,
			{ userId, videoId },
			TokenConfig()
		);
		dispatch({ type: Actions.ADD__OR__REMOVE__VIDEO__FROM__SAVED__VIDEOS, payload: data });
	};

	return (
		<VideoDataContext.Provider
			value={{
				state,
				dispatch,
				loadVideosData,
				dislikeClickHandler,
				logInUser,
				registerUser,
				loadUser,
				likeClickHandler,
				addOrRemoveFromWatchLater,
				addOrRemoveFromSavedVideos,
			}}
		>
			{children}
		</VideoDataContext.Provider>
	);
}

export const useVideoDataContext = () => {
	return useContext(VideoDataContext);
};
