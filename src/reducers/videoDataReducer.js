import * as Actions from "../constants";

export const videoDataReducer = (state, { type, payload }) => {
	switch (type) {
		case Actions.LOAD__VIDEOS__DATA:
			return {
				...state,
				videosData: [...payload.videos],
			};

		case Actions.ADD__TO__LIKED__VIDEOS:
			const isDislikedVideoFound =
				state.dislikedVideos.length > 0 &&
				state.dislikedVideos.find((el) => el._id === payload.clickedVideo);
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
						return el._id === payload.item.videos[payload.item.videos.length - 1]._id
							? {
									...el,
									likes: el.likes + 1,
									dislikes:
										el.dislikes >= 1 && isDislikedVideoFound
											? el.dislikes - 1
											: el.dislikes,
							  }
							: el;
					}
					if (
						payload.item.videos.length > 0 &&
						el._id !== payload.item.videos[payload.item.videos.length - 1]._id
					)
						console.log("inside else");
					return el._id === payload.clickedVideo
						? {
								...el,
								likes: el.likes - 1,
								dislikes:
									el.dislikes >= 1 && isDislikedVideoFound
										? el.dislikes - 1
										: el.dislikes,
						  }
						: el;
				}),
			};

		case Actions.CLICKED__ON__DISLIKE:
			const isLikedVideoFound =
				state.likedVideos.length > 0 &&
				state.likedVideos.find((el) => el._id === payload.clickedVideo);
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
						console.log("inside if on Dislike");
						return {
							...el,
							dislikes: el.dislikes + 1,
							likes: el.likes >= 1 && isLikedVideoFound ? el.likes - 1 : el.likes,
						};
					}
					if (
						payload.item.videos.length > 0 &&
						el._id !== payload.item.videos[payload.item.videos.length - 1]._id
					)
						console.log("inside else on dislike");
					return {
						...el,
						dislikes: el.dislikes - 1,
						likes: el.likes >= 1 && isLikedVideoFound ? el.likes - 1 : el.likes,
					};
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

		case Actions.ADD__OR__REMOVE__FROM__PLAYLISTS:
			return {
				...state,
				playlists: [...payload.item.playlists],
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

		case Actions.ADD__OR__REMOVE__VIDEO__FROM__WATCHLATER:
			return {
				...state,
				watchLater: [...payload.item.videos],
			};

		case Actions.ADD__OR__REMOVE__VIDEO__FROM__SAVED__VIDEOS:
			return {
				...state,
				savedVideos: [...payload.item.videos],
			};

		case Actions.SET__LOGIN:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
				likedVideos:
					payload.user.likedVideos.length > 0 ? payload.user.likedVideos[0].videos : [],
				watchLater:
					payload.user.watchLater.length > 0 ? payload.user.watchLater[0].videos : [],
				savedVideos:
					payload.user.savedVideos.length > 0 ? payload.user.savedVideos[0].videos : [],
				playlists:
					payload.user.playlists.length > 0 ? payload.user.playlists[0].playlists : [],
			};

		case Actions.SET__SIGNUP:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
			};

		case Actions.LOAD__USER:
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
				likedVideos:
					payload.user.likedVideos.length > 0 ? payload.user.likedVideos[0].videos : [],
				dislikedVideos:
					payload.user.dislikedVideos.length > 0
						? payload.user.dislikedVideos[0].videos
						: [],
				watchLater:
					payload.user.watchLater.length > 0 ? payload.user.watchLater[0].videos : [],
				savedVideos:
					payload.user.savedVideos.length > 0 ? payload.user.savedVideos[0].videos : [],
				playlists:
					payload.user.playlists.length > 0 ? payload.user.playlists[0].playlists : [],
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
