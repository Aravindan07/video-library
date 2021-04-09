import React from "react";
import YouTube from "react-youtube";
import { videoData } from "../../constants";

function VideoListing() {
	return (
		<div>
			{videoData.map((video) => (
				<YouTube videoId={video.videoId} id={video.id} className={`flex-row-center`} />
			))}
		</div>
	);
}

export default VideoListing;
