import React from "react";
import { PlayListVideosCard } from "../../components";
import { useVideoDataContext } from "../../context/videoDataContext";

function WatchLaterPage() {
	const { state } = useVideoDataContext();
	return (
		<div>
			{state.watchLater.length === 0 && (
				<h2 className="mt-16">Watch Later playlist is empty</h2>
			)}
			{state.watchLater.length > 0 &&
				state.watchLater.map((video) => (
					<PlayListVideosCard key={video._id} video={video} from="watchLater" />
				))}
		</div>
	);
}

export default WatchLaterPage;
