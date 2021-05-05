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
			console.log("inside existing playlist", action, state);
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

		default:
			return state;
	}
};
