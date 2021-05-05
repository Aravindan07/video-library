import React from "react";
import { useVideoDataContext } from "../../context/videoDataContext";
import PlayListCard from "../../components/PlayListCard";
import { useMediaQuery } from "../../utils/useMediaQueries";

function Playlists() {
	const {
		state: { playlists },
	} = useVideoDataContext();
	const [width] = useMediaQuery();
	return (
		<>
			{playlists.length === 0 ? (
				<h2 className={`${width <= 520 && "mt-16"}`}>You don't have any playlists</h2>
			) : (
				<h2 className={`${width <= 520 && "mt-16"}`}>Click on a playlist</h2>
			)}
			{playlists.map((el) => (
				<PlayListCard key={el.playlistId} data={el} />
			))}
		</>
	);
}

export default Playlists;
