import React, { useEffect, useState } from "react";
import { VideoListingCard } from "../../components";
import { useVideoDataContext, TokenConfig } from "../../context/videoDataContext";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import { useMediaQuery } from "../../utils/useMediaQueries";
import axios from "axios";
const { REACT_APP_BACKEND_URL } = process.env;

export default function LikedVideos() {
	useDocumentTitle("Liked Videos | CricTube");
	const { state } = useVideoDataContext();
	const [width] = useMediaQuery();
	const [likeData, setLikeData] = useState([]);
	return (
		<div>
			{state.likedVideos.length === 0 ? (
				<h2 className={`${width <= 520 ? "mt-16" : ""}`}>You didn't liked any videos</h2>
			) : (
				<>
					{state.likedVideos.map((video) => (
						<VideoListingCard key={video._id} video={video} />
					))}
				</>
			)}
		</div>
	);
}
