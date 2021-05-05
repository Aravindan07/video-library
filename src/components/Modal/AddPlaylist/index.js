import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD__TO__PLAYLIST, CLOSE__MODAL, OPEN__MODAL } from "../../../constants";
import { useVideoDataContext } from "../../../context/videoDataContext";
import { useMediaQuery } from "../../../utils/useMediaQueries";
import { ReactComponent as CloseIcon } from "../../../icons/close-sidebar.svg";
import "../ChoosePlaylist/styles.css";

function AddPlaylist({ data }) {
	const [name, setName] = useState("");
	const { dispatch } = useVideoDataContext();
	const [width] = useMediaQuery();

	const onChangeHandler = (event) => {
		return setName(event.target.value);
	};
	const addToPlayListHandler = () => {
		if (name === "") {
			return null;
		}
		dispatch({
			type: ADD__TO__PLAYLIST,
			payload: { playlistId: uuidv4(), playListName: name, videos: [data] },
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
			<CloseIcon className="close-icon" onClick={closeModalHandler} />
			<div className="flex-col-center mt-16 mb-16 w100">
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
