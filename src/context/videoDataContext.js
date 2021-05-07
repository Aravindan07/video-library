import { createContext, useContext, useReducer } from "react";
import { videoDataReducer } from "../reducers/videoDataReducer";
import {
	ADD__TO__LIKED__VIDEOS,
	LOAD__VIDEOS__DATA,
	initialState,
	CLICKED__ON__DISLIKE,
} from "../constants";
import { toast } from "react-toastify";

const VideoDataContext = createContext();

export default function VideoDataProvider({ children }) {
	const [state, dispatch] = useReducer(videoDataReducer, initialState);

	const loadVideosData = () => {
		dispatch({ type: LOAD__VIDEOS__DATA });
	};

	const addVideoToLikedVideos = (item) => {
		dispatch({ type: ADD__TO__LIKED__VIDEOS, payload: item });
		if (item.liked) {
			return toast.success("Item added to liked videos", {
				style: { backgroundColor: "var(--complementary-color)" },
				autoClose: 1500,
				hideProgressBar: true,
			});
		}
		return toast.info("Item removed from liked videos", {
			style: { backgroundColor: "#dcdcdc", color: "var(--font-color)" },
			autoClose: 1500,
			hideProgressBar: true,
		});
	};

	const dislikeClickHandler = (item) => {
		dispatch({ type: CLICKED__ON__DISLIKE, payload: item });
	};

	return (
		<VideoDataContext.Provider
			value={{
				state,
				dispatch,
				loadVideosData,
				addVideoToLikedVideos,
				dislikeClickHandler,
			}}
		>
			{children}
		</VideoDataContext.Provider>
	);
}

export const useVideoDataContext = () => {
	return useContext(VideoDataContext);
};
