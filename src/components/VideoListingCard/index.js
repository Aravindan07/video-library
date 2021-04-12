import { ReactComponent as TimeIcon } from "../../icons/time-icon.svg";
import { ReactComponent as VideoIcon } from "../../icons/video.svg";
import { ReactComponent as VideoViewIcon } from "../../icons/video-view.svg";
import { ReactComponent as HeartIcon } from "../../icons/heart.svg";
import { useNavigate } from "react-router";

function VideoListingCard({ video }) {
	const navigate = useNavigate();

	const showVideoPage = () => {
		navigate(`/video/${video.videoId}`);
	};
	return (
		<div
			className="video-thumbnail-card mt-32 mb-32 br-5 c-pointer ls-medium-px"
			onClick={() => showVideoPage()}
		>
			<img className="img-w300-h200 br-10" src={video.imageUrl} alt="Thumbnail" />
			<div className="padding-l16 padding-r16 padding-t16 padding-b16 content">
				<small className="mb-5">
					<b>Published on:</b> {video.publishedDate}
				</small>
				<h2 className="mb-16">{video.name}</h2>
				<p className="fw-500">{video.description}</p>
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

export default VideoListingCard;
