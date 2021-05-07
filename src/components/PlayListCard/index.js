import React from "react";
import { useVideoDataContext } from "../../context/videoDataContext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../icons/trash.svg";
import "./styles.css";
import "../VideoListingCard/styles.css";
import { REMOVE__PLAYLIST } from "../../constants";
import { useMediaQuery } from "../../utils/useMediaQueries";

function PlayListCard({ data }) {
	const { dispatch } = useVideoDataContext();
	let navigate = useNavigate();

	const [width] = useMediaQuery();

	const showPlaylistVideos = () => {
		return navigate(`${data.playlistId}`);
	};

	const deletePlaylistHandler = (event) => {
		event.stopPropagation();
		return dispatch({ type: REMOVE__PLAYLIST, payload: { playlistId: data.playlistId } });
	};

	return (
		<div
			className={`playlist-card mt-16 mb-16 ${width <= 520 ? "" : "padding-r8"} c-pointer ${
				width <= 520 ? "flex-col w100" : "flex-row"
			}`}
			onClick={showPlaylistVideos}
		>
			<DeleteIcon
				fill="var(--complementary-color)"
				className="delete-icon"
				onClick={deletePlaylistHandler}
			/>
			<img src={data.videos[0].imageUrl} alt="Playlist thumbnail" />
			<div
				className={`flex-row-center content ${
					width <= 520 ? "padding-t8 padding-b8" : "padding-l8"
				}`}
			>
				<h2 className="product__name ls-medium-px ls-medium-px mb-16">
					{data.playListName}
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
