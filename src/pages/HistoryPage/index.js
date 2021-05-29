import React from "react";
import { PlayListVideosCard } from "../../components";
import { useVideoDataContext } from "../../context/videoDataContext";

function HistoryPage() {
	const { state } = useVideoDataContext();

	return (
		<div>
			<h2>Your Learning History</h2>
			{state.history.length === 0 && <h2 className="mt-16">Saved Videos is empty</h2>}
			{state.history.length > 0 &&
				state.history.map((video) => (
					<PlayListVideosCard key={video._id} video={video} from="history" />
				))}
		</div>
	);
}

export default HistoryPage;
