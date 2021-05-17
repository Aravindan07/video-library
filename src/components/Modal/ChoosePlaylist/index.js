import { useState } from "react";
import { CLOSE__MODAL, OPEN__MODAL } from "../../../constants";
import { useVideoDataContext } from "../../../context/videoDataContext";
import { ReactComponent as CloseIcon } from "../../../icons/close-sidebar.svg";
import "./styles.css";

function ChoosePlaylist({ data }) {
	const {
		state: { playlists, user },
		playlistHandlers,
		dispatch,
	} = useVideoDataContext();

	const [focus, setFocus] = useState("");

	const setFocusHandler = (name) => {
		setFocus(name);
	};

	const goBackHandler = () => {
		dispatch({ type: CLOSE__MODAL });
		return dispatch({ type: OPEN__MODAL, payload: { modalType: "addPlaylist", data: data } });
	};

	const findPlaylist = playlists.find((el) => el.playlistName === focus);

	const addVideoToPlaylist = () => {
		if (focus === "") {
			return null;
		}
		return playlistHandlers("addVideoToPlaylist", user._id, data._id, null, findPlaylist._id);
	};

	const closeModalHandler = () => {
		return dispatch({ type: CLOSE__MODAL });
	};

	return (
		<>
			<h2 className="text-center product__name ls-medium-px">Choose a Playlist</h2>
			<CloseIcon className="close-icon" onClick={closeModalHandler} />
			{playlists.length === 0 ? (
				<div className="flex-col-center">
					<p className="text-center product__name mt-16">
						You didn't created any playlists
					</p>
					<button
						className="button button--error font-color--white mt-16"
						onClick={() => goBackHandler()}
					>
						Back
					</button>
				</div>
			) : (
				<div className="flex-col-center mt-16 mb-16 w100">
					{playlists.map((el) => (
						<div
							key={el._id}
							className={`playlist-div c-pointer ls-medium-px mt-8 mb-8 ${
								focus === el.playlistName ? "focused-div" : ""
							}`}
							onClick={(e) => setFocusHandler(el.playlistName)}
						>
							{el.playlistName}
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
			)}
		</>
	);
}

export default ChoosePlaylist;
