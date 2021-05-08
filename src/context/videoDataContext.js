import { createContext, useContext, useReducer } from "react";
import { videoDataReducer } from "../reducers/videoDataReducer";
import * as Actions from "../constants";
import { toast } from "react-toastify";

const VideoDataContext = createContext();

export default function VideoDataProvider({ children }) {
	const [state, dispatch] = useReducer(videoDataReducer, Actions.initialState);

	const loadVideosData = () => {
		dispatch({ type: Actions.LOAD__VIDEOS__DATA });
	};

	const addVideoToLikedVideos = (item) => {
		dispatch({ type: Actions.ADD__TO__LIKED__VIDEOS, payload: item });
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
		dispatch({ type: Actions.CLICKED__ON__DISLIKE, payload: item });
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
