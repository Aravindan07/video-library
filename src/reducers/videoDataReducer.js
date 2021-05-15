import * as Actions from "../constants";

export const videoDataReducer = (state, { type, payload }) => {
	const updateLikeInState = (toUpdate) => {
		let updatedPart = toUpdate === "videosData" ? state.videosData : state.watchLater;
		return updatedPart.map((el) =>
			el.id === payload.id ? { ...el, likes: el.likes - 1, liked: !el.liked } : el
		);
	};

	const updateDislike = (toUpdate) => {
		let updatedPart = toUpdate === "videosData" ? state.videosData : state.watchLater;
		return updatedPart.map((el) =>
			el.id === payload.id
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
			el.id === payload.id ? { ...el, watchLater: watchListed ? true : !el.watchLater } : el
		);
	};

	const dislikeClickHandler = (disliked) => {
		return state.videosData.map((el) =>
			el.id === payload.id
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

	switch (type) {
		case Actions.LOAD__VIDEOS__DATA:
			return {
				...state,
				videosData: [...payload.videos],
			};

		case Actions.ADD__TO__LIKED__VIDEOS:
			return {
				...state,
				likedVideos: [...payload.item.videos],
				dislikedVideos:
					state.dislikedVideos.length > 0 &&
					state.dislikedVideos.filter((el) => el._id !== payload.clickedVideo),
				videosData: state.videosData.map((el) => {
					if (
						payload.item.videos.length > 0 &&
						el._id === payload.item.videos[payload.item.videos.length - 1]._id
					) {
						console.log("inside if");
						return el._id === payload.item.videos[payload.item.videos.length - 1]._id
							? {
									...el,
									likes: el.likes + 1,
									dislikes: el.dislikes >= 1 ? el.dislikes - 1 : el.dislikes,
							  }
							: el;
					}
					console.log("inside else");
					return el._id === payload.clickedVideo
						? {
								...el,
								likes: el.likes - 1,
								dislikes: el.dislikes >= 1 ? el.dislikes - 1 : el.dislikes,
						  }
						: el;
				}),
			};

		// case Actions.CLICKED__ON__DISLIKE:
		// 	return {
		// 		...state,
		// 		likedVideos: state.likedVideos.filter((el) => el.id !== payload.id),
		// 		videosData:
		// 			payload.disLiked === false
		// 				? dislikeClickHandler(payload.disLiked)
		// 				: dislikeClickHandler(payload.disLiked),
		// 	};

		case Actions.CLICKED__ON__DISLIKE:
			return {
				...state,
				dislikedVideos: [...payload.item.videos],
				likedVideos:
					state.likedVideos.length > 0 &&
					state.likedVideos.filter((el) => el._id !== payload.clickedVideo),
				videosData: state.videosData.map((el) => {
					if (
						payload.item.videos.length > 0 &&
						el._id === payload.item.videos[payload.item.videos.length - 1]._id
					) {
						console.log("inside if");
						return el._id === payload.item.videos[payload.item.videos.length - 1]._id
							? {
									...el,
									dislikes: el.dislikes + 1,
									likes: el.likes >= 1 ? el.likes - 1 : el.likes,
							  }
							: el;
					}
					console.log("inside else");
					return el._id === payload.clickedVideo
						? {
								...el,
								dislikes: el.dislikes - 1,
								likes: el.likes >= 1 ? el.likes - 1 : el.likes,
						  }
						: el;
				}),
			};

		case Actions.OPEN__MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					isModalOpen: true,
					modalType: payload.modalType,
					data: payload.data,
				},
			};

		case Actions.CLOSE__MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					isModalOpen: false,
				},
			};

		case Actions.ADD__TO__PLAYLIST:
			return {
				...state,
				playlists: [...state.playlists, payload],
			};

		case Actions.ADD__VIDEO__TO__EXISTING__PLAYLIST:
			return {
				...state,
				playlists: state.playlists.map((el) =>
					el.playlistId === payload.playlistId
						? { ...el, videos: [...el.videos, payload.data] }
						: el
				),
			};

		case Actions.REMOVE__VIDEO__FROM__PLAYLIST:
			return {
				...state,
				playlists: state.playlists.map((el) =>
					el.playlistId === payload.playlistId
						? {
								...el,
								videos: el.videos.filter((video) => video.id !== payload.id),
						  }
						: el
				),
			};

		case Actions.REMOVE__PLAYLIST:
			return {
				...state,
				playlists: state.playlists.filter((el) => el.playlistId !== payload.playlistId),
			};

		case Actions.OPEN__MOBILE__MENU:
			return {
				...state,
				openMobileMenu: !state.openMobileMenu,
			};

		case Actions.CLOSE__MOBILE__MENU:
			return {
				...state,
				openMobileMenu: false,
			};

		case Actions.ADD__VIDEO__TO__WATCHLATER:
			return {
				...state,
				watchLater:
					payload.watchLater === false
						? state.watchLater.filter((el) => el.id !== payload.id)
						: [...state.watchLater, payload],
				videosData:
					payload.watchLater === false
						? addOrRemoveFromWatchLater(payload.watchLater)
						: addOrRemoveFromWatchLater(payload.watchLater),
			};

		case Actions.REMOVE__VIDEO__FROM__WATCHLATER:
			return {
				...state,
				videosData: state.videosData.map((el) =>
					el.id === payload.id ? { ...el, watchLater: false } : el
				),
				watchLater: state.watchLater.filter((el) => el.id !== payload.id),
			};

		case Actions.SET__LOGIN:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
				likedVideos: payload.user.likedVideos,
			};

		case Actions.SET__SIGNUP:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
			};

		case Actions.LOAD__USER:
			console.log("payload", payload);
			console.log(
				"liked",
				payload.user.likedVideos.length > 0 && payload.user.likedVideos[0].videos
			);
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
				likedVideos:
					payload.user.likedVideos.length > 0 && payload.user.likedVideos[0].videos,
				dislikedVideos:
					payload.user.dislikedVideos.length > 0 && payload.user.dislikedVideos[0].videos,
			};

		case Actions.SET__LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				user: null,
				isAuthenticated: false,
			};

		default:
			return state;
	}
};
