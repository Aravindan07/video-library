import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD__TO__PLAYLIST, CLOSE__MODAL, OPEN__MODAL } from "../../../constants";
import { useVideoDataContext } from "../../../context/videoDataContext";

function AddPlaylist({ data }) {
	const [name, setName] = useState("");
	const { dispatch } = useVideoDataContext();

	const onChangeHandler = (event) => {
		return setName(event.target.value);
	};
	const addToPlayListHandler = () => {
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

	return (
		<div>
			<h2 className="text-center product__name ls-medium-px">Add To Playlist</h2>
			<div className="flex-col-center mt-16 mb-16 w100">
				<input
					className="input__control"
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
