import { useState } from "react";
import {
	ADD__VIDEO__TO__EXISTING__PLAYLIST,
	CLOSE__MODAL,
	OPEN__MODAL,
	videoData,
} from "../../../constants";
import { useVideoDataContext } from "../../../context/videoDataContext";
import "./styles.css";

function ChoosePlaylist({ data }) {
	const {
		state: { playlists },
		dispatch,
	} = useVideoDataContext();

	const [focus, setFocus] = useState("");

	const onClickHandler = (name) => {
		setFocus(name);
	};

	const goBackHandler = () => {
		dispatch({ type: CLOSE__MODAL });
		return dispatch({ type: OPEN__MODAL, payload: { modalType: "addPlaylist", data: data } });
	};

	const addVideoToPlaylist = () => {
		let videoToAdd = playlists.find((el) => el.playListName === focus);
		console.log("videoToAdd", videoToAdd);
		console.log("data", data);
		dispatch({ type: CLOSE__MODAL });
		return dispatch({
			type: ADD__VIDEO__TO__EXISTING__PLAYLIST,
			payload: { playlistId: videoToAdd.playlistId, data: data },
		});
	};

	return (
		<>
			<h2 className="text-center product__name ls-medium-px">Choose a Playlist</h2>
			<div className="flex-col-center mt-16 mb-16 w100">
				{playlists.map((el) => (
					<div
						className={`playlist-div c-pointer ls-medium-px mt-8 mb-8 ${
							focus === el.playListName ? "focused-div" : ""
						}`}
						onClick={(e) => onClickHandler(el.playListName)}
					>
						{el.playListName}
					</div>
				))}
				<div className="flex-row-space-between w80">
					<button
						className="button button--error font-color--white mt-16"
						onClick={() => goBackHandler()}
					>
						Back
					</button>
					<button
						className="button button-primary font-color--white mt-16"
						onClick={() => addVideoToPlaylist()}
					>
						Add
					</button>
				</div>
			</div>
		</>
	);
}

export default ChoosePlaylist;
