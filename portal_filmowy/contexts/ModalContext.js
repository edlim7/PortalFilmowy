import React, { createContext, useState } from "react";
export const ModalContext = createContext();
export const ModalContextProvider = ({ children }) => {
	const [showModal, setShowModal] = useState(false);
	const [record, setRecord] = useState({ id: "", title: "" });
	const value = { showModal, setShowModal, record, setRecord };
	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};
