import React from "react";
import { VideoListingCard } from "../../components";
import { useVideoDataContext } from "../../context/videoDataContext";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import { useMediaQuery } from "../../utils/useMediaQueries";

export default function LikedVideos() {
	useDocumentTitle("Liked Videos | CricTube");
	const { state } = useVideoDataContext();
	const [width] = useMediaQuery();
	return (
		<div>
			{state.likedVideos.length === 0 ? (
				<h2 className={`${width <= 520 ? "mt-16" : ""}`}>You didn't liked any videos</h2>
			) : (
				<>
					{state.likedVideos.map((video) => (
						<VideoListingCard key={video.id} video={video} />
					))}
				</>
			)}
		</div>
	);
}
