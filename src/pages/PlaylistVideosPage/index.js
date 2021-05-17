import React from "react";
import { useParams } from "react-router-dom";
import { PlayListVideosCard } from "../../components";
import { useVideoDataContext } from "../../context/videoDataContext";
import { useDocumentTitle } from "../../utils/useDocumentTitle";

export default function PlaylistVideosPage() {
	useDocumentTitle("PlayList Videos | CricTube");
	const { playlistId } = useParams();
	const {
		state: { playlists },
	} = useVideoDataContext();
	const videosToShow = playlists.find((el) => el._id === playlistId);
	return (
		<>
			{videosToShow.videos.length === 0 && <h2>This playlist is empty</h2>}
			{videosToShow.videos.map((video) => (
				<PlayListVideosCard
					key={video._id}
					video={video}
					from="playlistVideos"
					playlistId={playlistId}
				/>
			))}
		</>
	);
}
