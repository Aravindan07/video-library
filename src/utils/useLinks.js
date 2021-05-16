import { useVideoDataContext } from "../context/videoDataContext";

export const useLinks = () => {
	const { state } = useVideoDataContext();
	return [
		{ name: "Home", path: "/" },
		{ name: "Playlists", path: `users/${state.user && state.user._id}/my-playlists` },
		{ name: "Liked Videos", path: `users/${state.user && state.user._id}/liked-videos` },
		{ name: "Watch Later", path: `users/${state.user && state.user._id}/watch-later` },
		{ name: "Saved Videos", path: `users/${state.user && state.user._id}/saved-videos` },
		{ name: "My Account", path: "/my-account" },
	];
};
