import React from "react";
import { useParams } from "react-router";
import { videoData } from "../../constants";
import YouTube from "react-youtube";
import "./styles.css";

function VideoPage() {
	const { id } = useParams();
	const dataToShow = videoData.find((item) => item.videoId === id);
	console.log(dataToShow);
	return (
		<div className="padding-l16 padding-r16">
			<YouTube
				videoId={dataToShow.videoId}
				id={dataToShow.id}
				className={`mt-8 w100 video-div br-10`}
			/>
		</div>
	);
}

export default VideoPage;
