import React from "react";
import VideoListingCard from "../../components/VideoListingCard";
import "./styles.css";
import { useVideoDataContext } from "../../context/videoDataContext";

function Home() {
	const {
		state: { videosData },
	} = useVideoDataContext();
	return (
		<div>
			<h2>Videos for you</h2>
			{videosData.map((video) => (
				<VideoListingCard key={video.id} video={video} />
			))}
		</div>
	);
}

export default Home;
