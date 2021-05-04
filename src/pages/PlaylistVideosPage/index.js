import React from "react";
import { useParams } from "react-router-dom";
import VideoListingCard from "../../components/VideoListingCard";
import { useVideoDataContext } from "../../context/videoDataContext";

export default function PlaylistVideosPage() {
	const { playlistId } = useParams();
	console.log("playlistId", playlistId);
	const {
		state: { playlists },
	} = useVideoDataContext();
	const videosToShow = playlists.find((el) => el.playlistId === playlistId);
	console.log(videosToShow);
	return (
		<>
			{videosToShow.videos.length === 0 && <h2>This playlist is empty</h2>}
			{videosToShow.videos.map((video) => (
				<VideoListingCard key={video.id} video={video} />
			))}
		</>
	);
}
