import React from "react";
import { videoData } from "../../constants";
import VideoListingCard from "../../components/VideoListingCard";
import "./styles.css";

function Home() {
	return (
		<div className="padding-l16 padding-r16">
			<h2 className="font-color--white ls-medium-px">Videos for you</h2>
			{videoData.map((video) => (
				<VideoListingCard key={video.id} video={video} />
			))}
		</div>
	);
}

export default Home;
