import React, { useEffect } from "react";
import Modal from "react-modal";

function ModalComponent({ isOpen, closeModal }) {
	console.log("Inside Modal");
	useEffect(() => {
		Modal.setAppElement("#root");
	});

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		/>
	);
}

export default ModalComponent;
