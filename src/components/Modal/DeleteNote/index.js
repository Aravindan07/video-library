import React from "react";
import { CLOSE__MODAL } from "../../../constants";
import { useVideoDataContext } from "../../../context/videoDataContext";
import { ReactComponent as CloseIcon } from "../../../icons/close-sidebar.svg";
import "../ChoosePlaylist/styles.css";

function DeleteNote({ data }) {
	const { state, dispatch, deleteNoteHandler } = useVideoDataContext();

	const closeModalHandler = () => {
		return dispatch({ type: CLOSE__MODAL });
	};

	const deleteNote = () => {
		return deleteNoteHandler(state.user._id, data);
	};

	return (
		<>
			<p className="text-center product__name ls-medium-px">
				Are you sure you want to delete this note ?
			</p>
			<CloseIcon className="close-icon c-pointer" onClick={closeModalHandler} />
			<div className="flex-row-center w100">
				<button
					className="button button--error font-color--white mt-32 ml-16 mr-16"
					onClick={deleteNote}
				>
					Delete
				</button>
				<button
					className="button button-primary font-color--white mt-32 ml-16 mr-16"
					onClick={closeModalHandler}
				>
					Cancel
				</button>
			</div>
		</>
	);
}

export default DeleteNote;
