import { ReactComponent as TimeIcon } from "../../icons/time-icon.svg";
import { ReactComponent as VideoIcon } from "../../icons/video.svg";
import { ReactComponent as VideoViewIcon } from "../../icons/video-view.svg";
import { ReactComponent as HeartIcon } from "../../icons/heart.svg";
import { ReactComponent as DeleteIcon } from "../../icons/trash.svg";
import { useNavigate, useParams } from "react-router";
import { useVideoDataContext } from "../../context/videoDataContext";
// import { REMOVE__VIDEO__FROM__PLAYLIST } from "../../constants";
import { useMediaQuery } from "../../utils/useMediaQueries";
import "../VideoListingCard/styles.css";

function PlayListVideosCard({ video, from }) {
	console.log("from", from);
	const navigate = useNavigate();
	// const { playlistId } = useParams();
	const { state, addOrRemoveFromWatchLater, addOrRemoveFromSavedVideos } = useVideoDataContext();
	const [width] = useMediaQuery();

	const showVideoPage = () => {
		return navigate(`/video/${video.videoId}`);
	};

	const deleteVideoHandler = (event) => {
		event.stopPropagation();
		if (from === "watchLater") {
			return addOrRemoveFromWatchLater(state.user._id, video._id);
		}
		if (from === "savedVideos") {
			return addOrRemoveFromSavedVideos(state.user._id, video._id);
		}
		// return dispatch({
		// 	type: REMOVE__VIDEO__FROM__PLAYLIST,
		// 	payload: { playlistId, id: video.id },
		// });
	};

	return (
		<div
			className={`video-thumbnail-card mt-32 mb-32 br-5 c-pointer ls-medium-px ${
				width <= 550 ? "flex-col" : ""
			}`}
			onClick={() => showVideoPage()}
		>
			<DeleteIcon
				fill="var(--complementary-color)"
				className="delete-icon"
				onClick={deleteVideoHandler}
			/>

			<img className={`border-radius-tl-bl-5 img-div`} src={video.imageUrl} alt="Thumbnail" />
			<div className="padding-l16 padding-r16 padding-t16 padding-b16 content-div">
				<small className="mb-5">
					<b>Published on:</b> {video.publishedDate}
				</small>
				<h2 className="mb-16">{video.name}</h2>
				<p className="fw-500 text">{video.description}</p>
				<div className="icon-container mt-16 flex-row-align-center">
					<VideoIcon fill="#6B7280" />
					<small className="ml-5 mr-16 gray-text-dark-mode">{video.channel}</small>
					<TimeIcon fill="#6B7280" />
					<small className="ml-5 gray-text-dark-mode mr-16">{video.watchLength}</small>
					<VideoViewIcon fill="#6B7280" />
					<small className="ml-5 gray-text-dark-mode mr-16">{video.views}</small>
					<HeartIcon fill="#6B7280" />
					<small className="ml-5 gray-text-dark-mode">{video.likes}</small>
				</div>
			</div>
		</div>
	);
}

export default PlayListVideosCard;
