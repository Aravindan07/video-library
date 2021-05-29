import React from "react";
import { useVideoDataContext } from "../../context/videoDataContext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../icons/trash.svg";
import "./styles.css";
import "../VideoListingCard/styles.css";
import { useMediaQuery } from "../../utils/useMediaQueries";

function PlayListCard({ data }) {
	const { state, playlistHandlers } = useVideoDataContext();
	let navigate = useNavigate();

	const [width] = useMediaQuery();

	const showPlaylistVideos = () => {
		return navigate(`${data._id}`);
	};

	const deletePlaylistHandler = (event) => {
		event.stopPropagation();
		return playlistHandlers("deletePlaylist", state.user._id, null, null, data._id);
	};

	return (
		<div
			onClick={showPlaylistVideos}
			className={`${width <= 720 ? "playlist-card flex-col" : "playlist-card flex-row"}`}
		>
			<DeleteIcon
				fill="var(--complementary-color)"
				className="delete-icon"
				onClick={deletePlaylistHandler}
			/>
			<div className="playlist-img-div">
				<img
					src={
						data.videos[0] && data.videos[0].imageUrl && data.videos[0].imageUrl
							? data.videos[0].imageUrl
							: "https://dummyimage.com/600x400/544e54/fff"
					}
					alt="Playlist thumbnail"
				/>
			</div>
			<div className="playlist-details-div">
				<h2 className="product__name ls-medium-px ls-medium-px mb-16">
					{data.playlistName}
				</h2>
				<p className="gray-text">
					Total Videos:
					<span style={{ color: "var(--font-color)" }}> {data.videos.length}</span>
				</p>
			</div>
		</div>
	);
}

export default PlayListCard;
