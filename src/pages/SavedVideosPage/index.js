import React from "react";
import { PlayListVideosCard } from "../../components";
import { useVideoDataContext } from "../../context/videoDataContext";

function SavedVideosPage() {
	const { state } = useVideoDataContext();
	return (
		<div>
			{state.savedVideos.length === 0 && <h2 className="mt-16">Saved Videos is empty</h2>}
			{state.savedVideos.length > 0 &&
				state.savedVideos.map((video) => (
					<PlayListVideosCard key={video._id} video={video} from="savedVideos" />
				))}
		</div>
	);
}

export default SavedVideosPage;
