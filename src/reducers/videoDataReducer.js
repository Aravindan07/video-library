import { ADD__TO__LIKED__VIDEOS, LOAD__VIDEOS__DATA, videoData } from "../constants";

export const videoDataReducer = (state, action) => {
	console.log(state, action);
	switch (action.type) {
		case LOAD__VIDEOS__DATA:
			return {
				...state,
				videosData: [...videoData],
			};
		case ADD__TO__LIKED__VIDEOS:
			return {
				...state,
				likedVideos: [...state.likedVideos, action.payload],
				videosData: state.videosData.map((el) =>
					el.id === action.payload.id ? { ...el, liked: true } : el
				),
			};

		default:
			return state;
	}
};
