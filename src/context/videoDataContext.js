import { createContext, useContext, useReducer } from "react";
import { videoDataReducer } from "../reducers/videoDataReducer";
import * as Actions from "../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

const { REACT_APP_BACKEND_URL } = process.env;

export const initialState = {
	videosData: [],
	user: {},
	likedVideos: [],
	dislikedVideos: [],
	playlists: [],
	watchLater: [],
	savedVideos: [],
	modal: {
		isModalOpen: false,
		modalType: "",
		data: null,
	},
	openMobileMenu: false,
	isAuthenticated: false,
};

export const TokenConfig = () => {
	//Get token from localStorage
	const token = localStorage.getItem("token");

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
	const [state, dispatch] = useReducer(videoDataReducer, initialState);

	const loadVideosData = async () => {
		try {
			const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/videos`);
			dispatch({ type: Actions.LOAD__VIDEOS__DATA, payload: data });
		} catch (error) {
			console.error(error);
		}
	};

	const loadUser = async () => {
		try {
			const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/users`, TokenConfig());
			dispatch({ type: Actions.LOAD__USER, payload: data });
		} catch (error) {
			console.error(error);
			toast.error("Please Login/Register to continue", {
				style: { backgroundColor: "var(--complementary-color)" },
				autoClose: 2000,
				hideProgressBar: true,
			});
		}
	};

	const logInUser = async (email, password) => {
		try {
			const { data } = await axios.post(`${REACT_APP_BACKEND_URL}/users/login`, {
				email,
				password,
			});
			dispatch({ type: Actions.SET__LOGIN, payload: data });
			toast.success("Logged in successfully", {
				style: { backgroundColor: "#15b996" },
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
			dispatch({ type: Actions.SET__SIGNUP, payload: data });
			toast.success("User Registered Successfully", {
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
		try {
			const { data } = await axios.post(
				`${REACT_APP_BACKEND_URL}/videos/${userId}/${videoId}/like`,
				{ userId, videoId },
				TokenConfig()
			);
			dispatch({ type: Actions.ADD__TO__LIKED__VIDEOS, payload: data });
			toast.success(data.message, {
				style: { backgroundColor: "var(--complementary-color)" },
				autoClose: 2000,
				hideProgressBar: true,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const dislikeClickHandler = async (userId, videoId) => {
		try {
			const { data } = await axios.post(
				`${REACT_APP_BACKEND_URL}/videos/${userId}/${videoId}/dislike`,
				{ userId, videoId },
				TokenConfig()
			);
			dispatch({ type: Actions.CLICKED__ON__DISLIKE, payload: data });
		} catch (error) {
			console.error(error);
		}
	};

	const addOrRemoveFromWatchLater = async (userId, videoId) => {
		try {
			const { data } = await axios.post(
				`${REACT_APP_BACKEND_URL}/users/${userId}/watch-later`,
				{ userId, videoId },
				TokenConfig()
			);
			toast.success(data.message, {
				style: { backgroundColor: "var(--complementary-color)" },
				autoClose: 2000,
				hideProgressBar: true,
			});
			dispatch({ type: Actions.ADD__OR__REMOVE__VIDEO__FROM__WATCHLATER, payload: data });
		} catch (error) {
			console.error(error);
		}
	};

	const addOrRemoveFromSavedVideos = async (userId, videoId) => {
		try {
			const { data } = await axios.post(
				`${REACT_APP_BACKEND_URL}/users/${userId}/save-videos`,
				{ userId, videoId },
				TokenConfig()
			);
			toast.success(data.message, {
				style: { backgroundColor: "var(--complementary-color)" },
				autoClose: 2000,
				hideProgressBar: true,
			});
			dispatch({ type: Actions.ADD__OR__REMOVE__VIDEO__FROM__SAVED__VIDEOS, payload: data });
		} catch (error) {
			console.error(error);
		}
	};

	const playlistHandlers = async (
		actionType,
		userId,
		videoId = null,
		playlistName = null,
		playlistId = null
	) => {
		try {
			if (actionType === "createNewPlaylist") {
				const { data } = await axios.post(
					`${REACT_APP_BACKEND_URL}/users/${userId}/playlists`,
					{ userId, videoId, playlistName },
					TokenConfig()
				);
				dispatch({ type: Actions.ADD__OR__REMOVE__FROM__PLAYLISTS, payload: data });
				toast.success(`Video added to playlist ${playlistName}`, {
					style: { backgroundColor: "var(--complementary-color)" },
					autoClose: 2000,
					hideProgressBar: true,
				});
				return dispatch({ type: Actions.CLOSE__MODAL });
			}
			if (actionType === "addVideoToPlaylist") {
				const { data } = await axios.put(
					`${REACT_APP_BACKEND_URL}/users/${userId}/playlists/${playlistId}`,
					{ userId, playlistId, videoId },
					TokenConfig()
				);
				dispatch({ type: Actions.ADD__OR__REMOVE__FROM__PLAYLISTS, payload: data });
				toast.success(`Video added to playlist`, {
					style: { backgroundColor: "var(--complementary-color)" },
					autoClose: 2000,
					hideProgressBar: true,
				});
				return dispatch({ type: Actions.CLOSE__MODAL });
			}
			if (actionType === "deletePlaylist") {
				const { data } = await axios.put(
					`${REACT_APP_BACKEND_URL}/users/${userId}/playlists/${playlistId}/delete`,
					{ userId, playlistId },
					TokenConfig()
				);
				dispatch({ type: Actions.ADD__OR__REMOVE__FROM__PLAYLISTS, payload: data });
				return dispatch({ type: Actions.CLOSE__MODAL });
			}
			if (actionType === "deleteVideoFromPlaylist") {
				const { data } = await axios.put(
					`${REACT_APP_BACKEND_URL}/users/${userId}/playlists/${playlistId}/${videoId}/delete`,
					{ userId, playlistId, videoId },
					TokenConfig()
				);
				dispatch({ type: Actions.ADD__OR__REMOVE__FROM__PLAYLISTS, payload: data });
				return dispatch({ type: Actions.CLOSE__MODAL });
			}
		} catch (error) {
			console.error(error);
		}
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
				playlistHandlers,
			}}
		>
			{children}
		</VideoDataContext.Provider>
	);
}

export const useVideoDataContext = () => {
	return useContext(VideoDataContext);
};
