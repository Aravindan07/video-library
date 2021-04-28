import React from "react";
import { useParams } from "react-router";
import { videoData } from "../../constants";
import YouTube from "react-youtube";
import { ReactComponent as VideoViewsIcon } from "../../icons/video-view.svg";
import { ReactComponent as LikesIcon } from "../../icons/thumbs-up.svg";
import { ReactComponent as DislikesIcon } from "../../icons/thumbs-down.svg";
import "./styles.css";

function VideoPage() {
	const { id } = useParams();
	const dataToShow = videoData.find((item) => item.videoId === id);
	console.log(dataToShow);
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
						<LikesIcon fill="var(--background-color)" className="w-20 mr-8" />
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
