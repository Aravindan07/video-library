import React from "react";
import { videoData } from "../../constants";
import VideoListingCard from "../../components/VideoListingCard";
import "./styles.css";

function Home() {
	return (
		<div>
			<h2>Videos for you</h2>
			{videoData.map((video) => (
				<VideoListingCard key={video.id} video={video} />
			))}
		</div>
	);
}

export default Home;
