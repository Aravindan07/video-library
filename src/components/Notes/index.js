import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { OPEN__MODAL } from "../../constants";
import { TokenConfig, useVideoDataContext } from "../../context/videoDataContext";
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../icons/trash.svg";
import axios from "axios";
import "./styles.css";

const { REACT_APP_BACKEND_URL } = process.env;

function Notes({ notesData }) {
	const { state, dispatch } = useVideoDataContext();

	let navigate = useNavigate();

	const [videoNotes, setVideoNotes] = useState({});

	const openModalHandler = (type, data = null) => {
		if (state.isAuthenticated) {
			return dispatch({
				type: OPEN__MODAL,
				payload: { modalType: type, data },
			});
		}
		return navigate("/my-account");
	};

	const findNotes =
		state.notes.length > 0 && state.notes.find((el) => el.videoId === notesData._id);

	useEffect(() => {
		(async () => {
			if (state.user._id) {
				const { data } = await axios.get(
					`${REACT_APP_BACKEND_URL}/users/${state.user?._id}/${notesData?._id}/get-notes`,
					TokenConfig()
				);
				setVideoNotes(data.item);
			}
		})();
		return () => setVideoNotes({});
	}, [notesData, state.user._id, dispatch]);

	return (
		<>
			{findNotes || videoNotes.note ? (
				<div
					className={`${
						findNotes || videoNotes.note
							? "notes-div flex-col padding-l8 padding-t8 padding-b8 padding-right-3rem"
							: "notes-div flex-col padding-l8 padding-t8 padding-b8"
					}`}
				>
					<div className="icons-div">
						<EditIcon
							stroke="var(--font-color)"
							onClick={() =>
								openModalHandler("editNotes", {
									notesData,
									notes: findNotes.note ? findNotes : videoNotes,
									type: "edit",
								})
							}
						/>
						<DeleteIcon
							stroke="var(--complementary-color)"
							className="mt-32"
							onClick={() => openModalHandler("deleteNotes", notesData._id)}
						/>
					</div>
					<p>{findNotes ? findNotes.note : videoNotes.note}</p>
				</div>
			) : (
				<div className="notes-div flex-col-center">
					<p className="text-center mt-16 mb-16 product__name">
						You don't have any notes
					</p>
					<button
						className="c-pointer button button-primary font-color--white"
						onClick={() => openModalHandler("addNotes", notesData)}
					>
						Add a Note
					</button>
				</div>
			)}
		</>
	);
}

export default Notes;
