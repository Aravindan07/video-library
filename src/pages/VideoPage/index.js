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
import {
	checkPlaylist,
	checkLiked,
	checkDisliked,
	checkWatchLater,
	checkSavedVideos,
} from "../../utils/helperFunctions";
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
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [dataToShow]);

	useDocumentTitle(`${dataToShow && dataToShow.name} | CricTube`);

	let navigate = useNavigate();

	const [width] = useMediaQuery();

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
						<div className="flex-row h-30 mt-8 mb-8">
							<div className="flex-row-center c-pointer mr-16">
								<VideoViewsIcon className="w-20 mr-8" />
								<p>{dataToShow.views}</p>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<LikesIcon
									fill={
										checkLiked(state.user, state.likedVideos, dataToShow._id)
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
										checkDisliked(
											state.user,
											state.dislikedVideos,
											dataToShow._id
										)
											? "var(--complementary-color)"
											: "var(--background-color)"
									}
									className="w-20 mr-8"
									onClick={() => reactionsClickHandler("dislike")}
								/>
								<p>{dataToShow.dislikes}</p>
							</div>
							<div className="flex-row-center c-pointer ml-16 icon-div">
								{checkPlaylist(state.playlists, dataToShow._id) > 0 && (
									<div className="notification-div">
										{checkPlaylist(state.playlists, dataToShow._id)}
									</div>
								)}
								<AddPlaylistIcon
									fill={
										checkPlaylist(state.playlists, dataToShow._id) > 0
											? "var(--primary-color)"
											: ""
									}
									className="w-20 mr-8"
									onClick={() => openModalHandler()}
								/>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<SaveIcon
									fill={
										checkSavedVideos(
											state.user,
											state.savedVideos,
											dataToShow._id
										)
											? "var(--primary-color)"
											: "var(--font-color)"
									}
									className="w-20 mr-8 h-30"
									onClick={() => savedVideosHandler()}
								/>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<WatchLaterIcon
									fill={
										checkWatchLater(
											state.user,
											state.watchLater,
											dataToShow._id
										)
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
