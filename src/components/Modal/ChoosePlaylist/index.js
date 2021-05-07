import { useState } from "react";
import { ADD__VIDEO__TO__EXISTING__PLAYLIST, CLOSE__MODAL, OPEN__MODAL } from "../../../constants";
import { useVideoDataContext } from "../../../context/videoDataContext";
import { ReactComponent as CloseIcon } from "../../../icons/close-sidebar.svg";
import { toast } from "react-toastify";
import "./styles.css";

function ChoosePlaylist({ data }) {
	const {
		state: { playlists },
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

	const addVideoToPlaylist = () => {
		let videoToAdd = playlists.find((el) => el.playListName === focus);
		dispatch({ type: CLOSE__MODAL });
		dispatch({
			type: ADD__VIDEO__TO__EXISTING__PLAYLIST,
			payload: { playlistId: videoToAdd.playlistId, data: data },
		});
		return toast.success(`Item added to playlist ${focus}`, {
			style: { backgroundColor: "var(--complementary-color)" },
			autoClose: 1500,
			hideProgressBar: true,
		});
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
							className={`playlist-div c-pointer ls-medium-px mt-8 mb-8 ${
								focus === el.playListName ? "focused-div" : ""
							}`}
							onClick={(e) => setFocusHandler(el.playListName)}
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
			)}
		</>
	);
}

export default ChoosePlaylist;
