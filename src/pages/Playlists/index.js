import React from "react";
import { useVideoDataContext } from "../../context/videoDataContext";
import PlayListCard from "../../components/PlayListCard";

function Playlists() {
	const {
		state: { playlists },
	} = useVideoDataContext();
	return (
		<>
			{playlists.length === 0 ? (
				<h2>You don't have any playlists</h2>
			) : (
				<h2>Click on a playlist</h2>
			)}
			{playlists.map((el) => (
				<PlayListCard key={el.playlistId} data={el} />
			))}
		</>
	);
}

export default Playlists;
