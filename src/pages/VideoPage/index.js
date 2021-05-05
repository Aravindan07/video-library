import { useEffect } from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import { ReactComponent as VideoViewsIcon } from "../../icons/video-view.svg";
import { ReactComponent as LikesIcon } from "../../icons/thumbs-up.svg";
import { ReactComponent as DislikesIcon } from "../../icons/thumbs-down.svg";
import { ReactComponent as AddPlaylistIcon } from "../../icons/add-playlist.svg";
import { ReactComponent as WatchLaterIcon } from "../../icons/watch-later.svg";
import { useVideoDataContext } from "../../context/videoDataContext";
import { ADD__VIDEO__TO__WATCHLATER, OPEN__MODAL } from "../../constants";
import { useMediaQuery } from "../../utils/useMediaQueries";
import "./styles.css";
import VideoListingCard from "../../components/VideoListingCard";

function VideoPage() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { videoId } = useParams();

	const { state, addVideoToLikedVideos, dislikeClickHandler, dispatch } = useVideoDataContext();

	const [width] = useMediaQuery();

	const dataToShow = state.videosData.find((item) => item.videoId === videoId);

	const reactionsClickHandler = (type) => {
		if (type === "like") {
			return addVideoToLikedVideos({ ...dataToShow, liked: !dataToShow.liked });
		}
		if (type === "dislike") {
			return dislikeClickHandler({ id: dataToShow.id, disLiked: !dataToShow.disLiked });
		}
	};

	const openModalHandler = () => {
		return dispatch({
			type: OPEN__MODAL,
			payload: { modalType: "addPlaylist", data: dataToShow },
		});
	};

	const addVideoToWatchLater = () => {
		return dispatch({
			type: ADD__VIDEO__TO__WATCHLATER,
			payload: { ...dataToShow, watchLater: !dataToShow.watchLater },
		});
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
									fill={dataToShow.liked ? "blue" : "var(--background-color)"}
									className="w-20 mr-8"
									onClick={() => reactionsClickHandler("like")}
								/>
								<p>{dataToShow.likes}</p>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<DislikesIcon
									fill={
										dataToShow.disLiked
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
									className="w-20 mr-8"
									onClick={() => openModalHandler()}
								/>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<WatchLaterIcon
									fill={
										dataToShow.watchLater
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
			{state.videosData.map((video) => (
				<VideoListingCard key={video.id} video={video} />
			))}
		</div>
	);
}

export default VideoPage;
