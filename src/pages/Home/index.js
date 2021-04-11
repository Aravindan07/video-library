import React from "react";
import { videoData } from "../../constants";
import { ReactComponent as TimeIcon } from "../../icons/time-icon.svg";
import "./styles.css";

function Home() {
	return (
		<div className="padding-l16 padding-r16">
			<h2 className="font-color--white ls-medium-px">Videos for you</h2>
			{videoData.map((video) => (
				<div
					key={video.videoId}
					className="video-thumbnail-card mt-32 mb-32 br-5 c-pointer ls-medium-px"
				>
					<img className="img-w300-h200 br-10" src={video.imageUrl} alt="Thumbnail" />
					<div className="padding-l16 padding-r16 padding-t16 padding-b16 content">
						<small className="mb-5">
							<b>Published on:</b> {video.publishedDate}
						</small>
						<h2 className="mb-16">{video.name}</h2>
						<p>{video.description}</p>
						<div className="icon-container mt-16 flex-row-align-center">
							<TimeIcon fill="#6B7280" />
							<small className="ml-5 gray-text-dark-mode">{video.watchLength}</small>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Home;
