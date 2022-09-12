import React, { createContext, useState } from "react";
export const ModalContext = createContext();
export const ModalContextProvider = ({ children }) => {
	const [showModalLogin, setShowModalLogin] = useState(false);
	const [showModalMovie, setShowModalMovie] = useState(false)
	const [movie, setMovie] = useState({ id: "", nazwa: "", oskary: "" });
	const value = { showModalLogin, setShowModalLogin, showModalMovie, setShowModalMovie, movie, setMovie };
	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};
