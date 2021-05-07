import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD__TO__PLAYLIST, CLOSE__MODAL, OPEN__MODAL } from "../../../constants";
import { useVideoDataContext } from "../../../context/videoDataContext";
import { useMediaQuery } from "../../../utils/useMediaQueries";
import { ReactComponent as CloseIcon } from "../../../icons/close-sidebar.svg";
import { toast } from "react-toastify";
import "../ChoosePlaylist/styles.css";

function AddPlaylist({ data }) {
	const [name, setName] = useState("");
	const { state, dispatch } = useVideoDataContext();
	const [width] = useMediaQuery();

	const findPresent = state.playlists.map((el) =>
		el.id === data.id
			? { ...el, videos: el.videos.filter((item) => item.videoId === data.videoId) }
			: el
	);
	const getNames = findPresent.map((el) => el.playListName);

	const onChangeHandler = (event) => {
		return setName(event.target.value);
	};
	const addToPlayListHandler = () => {
		if (name === "") {
			return null;
		}
		dispatch({
			type: ADD__TO__PLAYLIST,
			payload: { id: data.id, playlistId: uuidv4(), playListName: name, videos: [data] },
		});
		toast.success(`Item added to playlist ${name}`, {
			style: { backgroundColor: "var(--complementary-color)" },
			autoClose: 1500,
			hideProgressBar: true,
		});
		return dispatch({ type: CLOSE__MODAL });
	};

	const chooseFromPlaylist = () => {
		dispatch({ type: CLOSE__MODAL });
		return dispatch({
			type: OPEN__MODAL,
			payload: { modalType: "choosePlaylist", data: data },
		});
	};

	const closeModalHandler = () => {
		return dispatch({ type: CLOSE__MODAL });
	};

	return (
		<div>
			<h2 className="text-center product__name ls-medium-px">Add To Playlist</h2>
			<CloseIcon className="close-icon c-pointer" onClick={closeModalHandler} />
			<div className="flex-col-center mt-16 mb-16 w100">
				<small className="mb-16">
					This Video is already present in playlists
					{getNames.map((el) => (
						<strong>
							{" "}
							{el}
							{getNames.length > 1 && ","}
						</strong>
					))}
				</small>
				<input
					className={`input__control ${width <= 500 ? "w100" : ""}`}
					type="text"
					id="name"
					value={name}
					onChange={(e) => onChangeHandler(e)}
					placeholder="Enter a name"
					required
				/>
				<div className="flex-col-center">
					<button
						className="button button--error font-color--white mt-16 mb-8"
						onClick={() => addToPlayListHandler()}
					>
						Create
					</button>
					<span className="product__name">or</span>
					<button
						className="button button-primary font-color--white mt-8 mb-8"
						onClick={() => chooseFromPlaylist()}
					>
						Choose One
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddPlaylist;
