import React, { useEffect } from "react";
import Modal from "react-modal";
import { CLOSE__MODAL } from "../../constants";
import { useVideoDataContext } from "../../context/videoDataContext";
import AddPlaylist from "./AddPlaylist";
import ChoosePlayList from "./ChoosePlaylist";

const modalList = {
	addPlaylist: AddPlaylist,
	choosePlaylist: ChoosePlayList,
};

function ModalComponent() {
	const {
		dispatch,
		state: { modal },
	} = useVideoDataContext();
	useEffect(() => {
		Modal.setAppElement("#root");
	});

	const closeModal = () => {
		return dispatch({ type: CLOSE__MODAL });
	};

	const overlay = {
		backgroundColor: "rgba(0,0,0,0.8)",
	};

	const content = {
		width: "50%",
		height: "50%",
		margin: "auto",
		borderRadius: "5px",
		padding: "30px 20px 20px 20px",
		zIndex: "10",
	};

	const ModalToShow = modalList[modal.modalType];

	return (
		<Modal
			isOpen={modal.isModalOpen}
			onRequestClose={closeModal}
			style={{
				overlay: overlay,
				content: content,
			}}
			contentLabel="Example Modal"
		>
			{modal.isModalOpen && <ModalToShow data={modal.data} />}
		</Modal>
	);
}

export default ModalComponent;
