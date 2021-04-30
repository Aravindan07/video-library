import React from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import { ReactComponent as VideoViewsIcon } from "../../icons/video-view.svg";
import { ReactComponent as LikesIcon } from "../../icons/thumbs-up.svg";
import { ReactComponent as DislikesIcon } from "../../icons/thumbs-down.svg";
import "./styles.css";
import { useVideoDataContext } from "../../context/videoDataContext";

function VideoPage() {
	const { id } = useParams();

	const { state, addVideoToLikedVideos } = useVideoDataContext();
	console.log(state);

	const dataToShow = state.videosData.find((item) => item.videoId === id);
	console.log("dataToShow", dataToShow);

	const likeClickHandler = () => {
		addVideoToLikedVideos({ ...dataToShow, liked: true });
	};

	return (
		<div className="padding-l16 padding-r16 mb-32">
			<YouTube
				videoId={dataToShow.videoId}
				id={dataToShow.id}
				className={`mt-8 w100 video-div br-10`}
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
							onClick={() => likeClickHandler()}
						/>
						<p>{dataToShow.likes}</p>
					</div>
					<div className="flex-row-center c-pointer ml-16">
						<DislikesIcon fill="var(--background-color)" className="w-20 mr-8" />
						<p>{dataToShow.dislikes}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VideoPage;
