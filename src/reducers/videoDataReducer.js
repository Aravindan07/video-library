import {
	ADD__TO__LIKED__VIDEOS,
	ADD__TO__PLAYLIST,
	ADD__VIDEO__TO__EXISTING__PLAYLIST,
	CLICKED__ON__DISLIKE,
	CLOSE__MODAL,
	LOAD__VIDEOS__DATA,
	OPEN__MOBILE__MENU,
	OPEN__MODAL,
	REMOVE__PLAYLIST,
	REMOVE__VIDEO__FROM__PLAYLIST,
	CLOSE__MOBILE__MENU,
	videoData,
	ADD__VIDEO__TO__WATCHLATER,
	REMOVE__VIDEO__FROM__WATCHLATER,
	SET__LOGIN,
	SET__LOGOUT,
} from "../constants";

export const videoDataReducer = (state, action) => {
	console.log("state, action", state, action);

	const updateLikeInState = (toUpdate) => {
		let updatedPart = toUpdate === "videosData" ? state.videosData : state.watchLater;
		return updatedPart.map((el) =>
			el.id === action.payload.id ? { ...el, likes: el.likes - 1, liked: !el.liked } : el
		);
	};

	const updateDislike = (toUpdate) => {
		let updatedPart = toUpdate === "videosData" ? state.videosData : state.watchLater;
		return updatedPart.map((el) =>
			el.id === action.payload.id
				? {
						...el,
						likes: el.likes + 1,
						liked: !el.liked,
						dislikes: el.dislikes > 0 ? el.dislikes - 1 : el.dislikes,
						disLiked: false,
				  }
				: el
		);
	};

	const addOrRemoveFromWatchLater = (watchListed) => {
		return state.videosData.map((el) =>
			el.id === action.payload.id
				? { ...el, watchLater: watchListed ? true : !el.watchLater }
				: el
		);
	};

	const dislikeClickHandler = (disliked) => {
		return state.videosData.map((el) =>
			el.id === action.payload.id
				? {
						...el,
						liked: disliked ? false : el.liked,
						likes: disliked ? (el.likes > 0 ? el.likes - 1 : el.likes) : el.likes,
						dislikes: disliked ? el.dislikes + 1 : el.dislikes - 1,
						disLiked: !el.disLiked,
				  }
				: el
		);
	};

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
						? updateLikeInState("videosData")
						: updateDislike("videosData"),
				watchLater:
					action.payload.liked === false
						? updateLikeInState("watchLater")
						: updateDislike("watchLater"),
			};

		case CLICKED__ON__DISLIKE:
			return {
				...state,
				likedVideos: state.likedVideos.filter((el) => el.id !== action.payload.id),
				videosData:
					action.payload.disLiked === false
						? dislikeClickHandler(action.payload.disLiked)
						: dislikeClickHandler(action.payload.disLiked),
			};

		case OPEN__MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					isModalOpen: true,
					modalType: action.payload.modalType,
					data: action.payload.data,
				},
			};

		case CLOSE__MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					isModalOpen: false,
				},
			};

		case ADD__TO__PLAYLIST:
			return {
				...state,
				playlists: [...state.playlists, action.payload],
			};

		case ADD__VIDEO__TO__EXISTING__PLAYLIST:
			return {
				...state,
				playlists: state.playlists.map((el) =>
					el.playlistId === action.payload.playlistId
						? { ...el, videos: [...el.videos, action.payload.data] }
						: el
				),
			};

		case REMOVE__VIDEO__FROM__PLAYLIST:
			return {
				...state,
				playlists: state.playlists.map((el) =>
					el.playlistId === action.payload.playlistId
						? {
								...el,
								videos: el.videos.filter((video) => video.id !== action.payload.id),
						  }
						: el
				),
			};

		case REMOVE__PLAYLIST:
			return {
				...state,
				playlists: state.playlists.filter(
					(el) => el.playlistId !== action.payload.playlistId
				),
			};

		case OPEN__MOBILE__MENU:
			return {
				...state,
				openMobileMenu: !state.openMobileMenu,
			};

		case CLOSE__MOBILE__MENU:
			return {
				...state,
				openMobileMenu: false,
			};

		case ADD__VIDEO__TO__WATCHLATER:
			return {
				...state,
				watchLater:
					action.payload.watchLater === false
						? state.watchLater.filter((el) => el.id !== action.payload.id)
						: [...state.watchLater, action.payload],
				videosData:
					action.payload.watchLater === false
						? addOrRemoveFromWatchLater(action.payload.watchLater)
						: addOrRemoveFromWatchLater(action.payload.watchLater),
			};

		case REMOVE__VIDEO__FROM__WATCHLATER:
			return {
				...state,
				videosData: state.videosData.map((el) =>
					el.id === action.payload.id ? { ...el, watchLater: false } : el
				),
				watchLater: state.watchLater.filter((el) => el.id !== action.payload.id),
			};

		case SET__LOGIN:
			return {
				...state,
				isAuthenticated: true,
			};

		case SET__LOGOUT:
			return {
				...state,
				isAuthenticated: false,
			};

		default:
			return state;
	}
};
