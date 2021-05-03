import {
	ADD__TO__LIKED__VIDEOS,
	CLICKED__ON__DISLIKE,
	LOAD__VIDEOS__DATA,
	videoData,
} from "../constants";

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
				likedVideos:
					action.payload.liked === false
						? state.likedVideos.filter((el) => el.id !== action.payload.id)
						: [...state.likedVideos, action.payload],
				videosData:
					action.payload.liked === false
						? state.videosData.map((el) =>
								el.id === action.payload.id
									? { ...el, likes: el.likes - 1, liked: !el.liked }
									: el
						  )
						: state.videosData.map((el) =>
								el.id === action.payload.id
									? {
											...el,
											likes: el.likes + 1,
											liked: !el.liked,
											dislikes:
												el.dislikes > 0 ? el.dislikes - 1 : el.dislikes,
											disLiked: false,
									  }
									: el
						  ),
			};

		case CLICKED__ON__DISLIKE:
			return {
				...state,
				likedVideos: state.likedVideos.filter((el) => el.id !== action.payload.id),
				videosData:
					action.payload.disLiked === false
						? state.videosData.map((el) =>
								el.id === action.payload.id
									? {
											...el,
											dislikes: el.dislikes - 1,
											disLiked: !el.disLiked,
									  }
									: el
						  )
						: state.videosData.map((el) =>
								el.id === action.payload.id
									? {
											...el,
											liked: false,
											likes: el.likes > 0 ? el.likes - 1 : el.likes,
											dislikes: el.dislikes + 1,
											disLiked: !el.disLiked,
									  }
									: el
						  ),
			};

		default:
			return state;
	}
};
