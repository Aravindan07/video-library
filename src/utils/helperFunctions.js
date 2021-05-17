export const checkPlaylist = (playlists, id) => {
	let count = 0;
	playlists.forEach((el) => {
		el.videos.filter((item) => (item._id === id ? (count = count + 1) : count));
	});
	return count;
};

export const checkLiked = (user, likedVideos, id) => {
	return user && likedVideos && likedVideos.find((el) => el._id === id);
};

export const checkDisliked = (user, dislikedVideos, id) => {
	return user && dislikedVideos && dislikedVideos.find((el) => el._id === id);
};

export const checkWatchLater = (user, watchLater, id) => {
	return user && watchLater && watchLater.find((el) => el._id === id);
};

export const checkSavedVideos = (user, savedVideos, id) => {
	return user && savedVideos && savedVideos.find((el) => el._id === id);
};
