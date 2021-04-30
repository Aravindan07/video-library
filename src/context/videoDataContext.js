import { createContext, useContext, useReducer } from "react";
import { videoDataReducer } from "../reducers/videoDataReducer";
import { ADD__TO__LIKED__VIDEOS, LOAD__VIDEOS__DATA, initialState } from "../constants";
const VideoDataContext = createContext();

export default function VideoDataProvider({ children }) {
	const [state, dispatch] = useReducer(videoDataReducer, initialState);

	const loadVideosData = () => {
		dispatch({ type: LOAD__VIDEOS__DATA });
	};

	const addVideoToLikedVideos = (item) => {
		dispatch({ type: ADD__TO__LIKED__VIDEOS, payload: item });
	};
	return (
		<VideoDataContext.Provider
			value={{ state, dispatch, loadVideosData, addVideoToLikedVideos }}
		>
			{children}
		</VideoDataContext.Provider>
	);
}

export const useVideoDataContext = () => {
	return useContext(VideoDataContext);
};
