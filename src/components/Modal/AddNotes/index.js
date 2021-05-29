import React, { useState } from "react";
import { CLOSE__MODAL } from "../../../constants";
import { useVideoDataContext } from "../../../context/videoDataContext";
import { ReactComponent as CloseIcon } from "../../../icons/close-sidebar.svg";
import "../../../pages/Accountpage/styles.css";

function AddNotes({ data }) {
	const { state, dispatch, addOrEditNotesHandler } = useVideoDataContext();

	const [notes, setNotes] = useState(data.notes ? data.notes.note : "");

	const [isNotesActive, setIsNotesActive] = useState("");

	const closeModalHandler = () => {
		return dispatch({ type: CLOSE__MODAL });
	};

	const onChangeHandler = (e) => {
		let value = e.target.value;
		setNotes(value);
		if (value !== "" || notes.length > 0) {
			return setIsNotesActive(true);
		}
		setIsNotesActive(false);
	};

	const addOrEditNotes = () => {
		if (data.type === "edit") {
			return addOrEditNotesHandler(
				state.user._id,
				data.notesData._id,
				notes,
				data.notes._id,
				"edit"
			);
		}
		return addOrEditNotesHandler(state.user._id, data._id, notes, null, "add");
	};

	return (
		<div className="flex-col">
			<h2 className="text-center product__name ls-medium-px">
				{data.type === "edit" ? "Edit Notes" : "Add Notes"}
			</h2>
			<CloseIcon className="close-icon c-pointer" onClick={closeModalHandler} />
			<div className="text-area-wrap">
				<label
					htmlFor="email"
					className={`${isNotesActive ? "label transformed-label" : "label"}`}
				>
					Add Notes
				</label>
				<textarea
					className="text-area mt-16 mb-16"
					type="text"
					id="name"
					value={notes}
					onChange={(e) => onChangeHandler(e)}
					rows="7"
					autoFocus
					required
				/>
			</div>
			<div className="w100 flex-row-space-between">
				<button
					className="button button--error font-color--white mt-16 mb-8"
					onClick={closeModalHandler}
				>
					Cancel
				</button>
				<button
					className="button button-primary font-color--white mt-16 mb-8"
					onClick={addOrEditNotes}
				>
					{data.type === "edit" ? "Update" : "Add"}
				</button>
			</div>
		</div>
	);
}

export default AddNotes;
