import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import YouTube from "react-youtube";
import { ReactComponent as VideoViewsIcon } from "../../icons/video-view.svg";
import { ReactComponent as LikesIcon } from "../../icons/thumbs-up.svg";
import { ReactComponent as DislikesIcon } from "../../icons/thumbs-down.svg";
import { ReactComponent as AddPlaylistIcon } from "../../icons/add-playlist.svg";
import { ReactComponent as WatchLaterIcon } from "../../icons/watch-later.svg";
import { ReactComponent as SaveIcon } from "../../icons/save-icon.svg";
import { useVideoDataContext } from "../../context/videoDataContext";
import { OPEN__MODAL } from "../../constants";
import { useMediaQuery } from "../../utils/useMediaQueries";
import { VideoListingCard } from "../../components";
import "./styles.css";
import { useDocumentTitle } from "../../utils/useDocumentTitle";

function VideoPage() {
	const {
		state,
		dislikeClickHandler,
		dispatch,
		likeClickHandler,
		addOrRemoveFromWatchLater,
		addOrRemoveFromSavedVideos,
	} = useVideoDataContext();
	const { videoId } = useParams();
	const dataToShow =
		state.videosData && state.videosData.find((item) => item.videoId === videoId);
	console.log("dataToShow", dataToShow);
	console.log("state", state);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [dataToShow]);

	useDocumentTitle(`${dataToShow && dataToShow.name} | CricTube`);

	let navigate = useNavigate();

	const [width] = useMediaQuery();

	const checkLiked = (id) => {
		return state.user && state.likedVideos && state.likedVideos.find((el) => el._id === id);
	};

	const checkDisliked = (id) => {
		return (
			state.user && state.dislikedVideos && state.dislikedVideos.find((el) => el._id === id)
		);
	};

	const checkWatchLater = (id) => {
		return state.user && state.watchLater && state.watchLater.find((el) => el._id === id);
	};
	const checkSavedVideos = (id) => {
		return state.user && state.savedVideos && state.savedVideos.find((el) => el._id === id);
	};

	const reactionsClickHandler = (type) => {
		if (state.isAuthenticated) {
			if (type === "like") {
				return likeClickHandler(state.user._id, dataToShow._id);
			}
			if (type === "dislike") {
				return dislikeClickHandler(state.user._id, dataToShow._id);
			}
		}
		return navigate("/my-account");
	};

	const openModalHandler = () => {
		if (state.isAuthenticated) {
			return dispatch({
				type: OPEN__MODAL,
				payload: { modalType: "addPlaylist", data: dataToShow },
			});
		}
		return navigate("/my-account");
	};

	const addVideoToWatchLater = () => {
		if (state.isAuthenticated) {
			return addOrRemoveFromWatchLater(state.user._id, dataToShow._id);
		}
		return navigate("/my-account");
	};

	const savedVideosHandler = () => {
		if (state.isAuthenticated) {
			return addOrRemoveFromSavedVideos(state.user._id, dataToShow._id);
		}
		return navigate("/my-account");
	};

	const opts = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
	};

	return (
		<div className={`${width >= 550 && "padding-l16 padding-r16"} mb-32`}>
			{dataToShow && (
				<>
					<YouTube
						videoId={dataToShow.videoId}
						id={dataToShow.id}
						className={`mt-8 w100 video-div br-10`}
						opts={opts}
					/>
					<div className="flex-row-space-between">
						<div className="flex-col">
							<p className="mt-16 font-18">{dataToShow.name}</p>
							<p className="mt-8 fw-600">{dataToShow.channel}</p>
							<p className="mt-8 gray-text">{dataToShow.publishedDate}</p>
						</div>
						<div className="flex-row">
							<div className="flex-row-center c-pointer mr-16">
								<VideoViewsIcon className="w-20 mr-8" />
								<p>{dataToShow.views}</p>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<LikesIcon
									fill={
										checkLiked(dataToShow._id)
											? "#2563EB"
											: "var(--background-color)"
									}
									className="w-20 mr-8"
									onClick={() => reactionsClickHandler("like")}
								/>
								<p>{dataToShow.likes}</p>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<DislikesIcon
									fill={
										checkDisliked(dataToShow._id)
											? "var(--complementary-color)"
											: "var(--background-color)"
									}
									className="w-20 mr-8"
									onClick={() => reactionsClickHandler("dislike")}
								/>
								<p>{dataToShow.dislikes}</p>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<AddPlaylistIcon
									fill={state.playlists.length > 0 ? "#2563EB" : ""}
									className="w-20 mr-8"
									onClick={() => openModalHandler()}
								/>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<SaveIcon
									fill={
										checkSavedVideos(dataToShow._id)
											? "var(--primary-color)"
											: "var(--font-color)"
									}
									className="w-20 mr-8"
									onClick={() => savedVideosHandler()}
								/>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<WatchLaterIcon
									fill={
										checkWatchLater(dataToShow._id)
											? "var(--complementary-color)"
											: "var(--font-color)"
									}
									className="w-20 mr-8"
									onClick={() => addVideoToWatchLater()}
								/>
							</div>
						</div>
					</div>
					<p className="mt-8 mb-8">{dataToShow.description}</p>
				</>
			)}
			<hr className="mt-16 mb-8" />
			<h2 className="mt-16">All Videos</h2>
			{state.videosData &&
				state.videosData.map((video) => <VideoListingCard key={video._id} video={video} />)}
		</div>
	);
}

export default VideoPage;
