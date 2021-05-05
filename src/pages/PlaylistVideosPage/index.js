import React from "react";
import { useParams } from "react-router-dom";
import PlayListVideosCard from "../../components/PlayListVideosCard";
import { useVideoDataContext } from "../../context/videoDataContext";

export default function PlaylistVideosPage() {
	const { playlistId } = useParams();
	const {
		state: { playlists },
	} = useVideoDataContext();
	const videosToShow = playlists.find((el) => el.playlistId === playlistId);
	return (
		<>
			{videosToShow.videos.length === 0 && <h2>This playlist is empty</h2>}
			{videosToShow.videos.map((video) => (
				<PlayListVideosCard key={video.id} video={video} />
			))}
		</>
	);
}
