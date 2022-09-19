import React, { createContext, useState } from "react";
export const ModalContext = createContext();
export const ModalContextProvider = ({ children }) => {
	const [showModalLogin, setShowModalLogin] = useState(false);
	const [showModalMovie, setShowModalMovie] = useState(false)
	const [movie, setMovie] = useState({ id: "", nazwa: "", oskary: "",produkcjaId:0 });
	const value = { showModalLogin, setShowModalLogin, showModalMovie, setShowModalMovie, movie, setMovie };
	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};
