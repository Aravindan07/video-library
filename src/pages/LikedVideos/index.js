import React from "react";
import VideoListingCard from "../../components/VideoListingCard";
import { useVideoDataContext } from "../../context/videoDataContext";

export default function LikedVideos() {
	const { state } = useVideoDataContext();
	return (
		<div>
			{state.likedVideos.map((video) => (
				<VideoListingCard key={video.id} video={video} />
			))}
		</div>
	);
}
