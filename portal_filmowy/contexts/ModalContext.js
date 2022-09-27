import React, { createContext, useState } from "react";
export const ModalContext = createContext();
export const ModalContextProvider = ({ children }) => {
	const [showModalLogin, setShowModalLogin] = useState(false);
	const [showModalMovie, setShowModalMovie] = useState(false);
	const [showModalSeries, setShowModalSeries] = useState(false);
	const [showAddModalMovie, setShowAddModalMovie] = useState(false);
	const [movie, setMovie] = useState({ id: "", nazwa: "", oskary: "", produkcjaId: 0, ocea: 0 });
	const [addMovie, setAddMovie] = useState({ nazwa:"", opis: "", zdjecie: "", kategoria: 0, edukacyjny: false, oskary: 0 });
	const [series, setSeries] = useState({ id: "", nazwa: "", odcinki: 0, produkcjaId: 0, sezony: 0, ocea: 0 });
	const value = { showModalLogin, setShowModalLogin, showModalMovie, setShowModalMovie, movie, setMovie, 
		showModalSeries, setShowModalSeries, series, setSeries, 
		showAddModalMovie, setShowAddModalMovie, addMovie, setAddMovie };
	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};
