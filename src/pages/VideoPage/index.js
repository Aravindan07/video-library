import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import YouTube from "react-youtube";
import { ReactComponent as VideoViewsIcon } from "../../icons/video-view.svg";
import { ReactComponent as LikesIcon } from "../../icons/thumbs-up.svg";
import { ReactComponent as DislikesIcon } from "../../icons/thumbs-down.svg";
import { ReactComponent as AddPlaylistIcon } from "../../icons/add-playlist.svg";
import { ReactComponent as WatchLaterIcon } from "../../icons/watch-later.svg";
import { ReactComponent as SaveIcon } from "../../icons/save-icon.svg";
import { ReactComponent as NotesIcon } from "../../icons/notes.svg";
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
import { VideoListingCard, Notes } from "../../components";
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
		addOrRemoveFromHistory,
	} = useVideoDataContext();

	const { videoId } = useParams();

	const dataToShow =
		state.videosData && state.videosData.find((item) => item.videoId === videoId);

	const [showNotes, setShowNotes] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		return () => setShowNotes(false);
	}, [dataToShow?._id]);

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

	const showNotesHandler = () => {
		return setShowNotes(!showNotes);
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

	const alreadyPresentInHistory = state.history.find((video) => video._id === dataToShow._id);

	const addToHistoryHandler = (videoId) => {
		if (alreadyPresentInHistory) {
			return null;
		}
		return addOrRemoveFromHistory(state.user._id, videoId);
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
						id={dataToShow._id}
						className={`mt-8 w100 video-div br-10`}
						opts={opts}
						onPlay={() => addToHistoryHandler(dataToShow._id)}
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
							<div
								className={`${
									width <= 325
										? "flex-row-center c-pointer mr-8 mt-8"
										: "flex-row-center c-pointer ml-16"
								}`}
							>
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
							<div
								className={`${
									width <= 375
										? "flex-row-center c-pointer ml-16 mt-8"
										: "flex-row-center c-pointer ml-16"
								}`}
							>
								<NotesIcon
									fill={showNotes ? "var(--primary-color)" : "var(--font-color)"}
									className="w-20 mr-8"
									onClick={showNotesHandler}
								/>
							</div>
						</div>
					</div>
					<p className={`${width <= 425 ? "mt-16 mb-8 padding-t16" : "mt-8 mb-8"}`}>
						{dataToShow.description}
					</p>
					{showNotes && <Notes notesData={dataToShow} />}
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
