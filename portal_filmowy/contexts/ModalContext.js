import React, { createContext, useState } from "react";
export const ModalContext = createContext();
export const ModalContextProvider = ({ children }) => {
	const [showModalLogin, setShowModalLogin] = useState(false);
	const [showModalMovie, setShowModalMovie] = useState(false);
	const [showModalSeries, setShowModalSeries] = useState(false);
	const [showAddModalMovie, setShowAddModalMovie] = useState(false);
	const [showAddModalSeries, setShowAddModalSeries] = useState(false);
	const [showUpdateModalMovie, setShowUpdateModalMovie] = useState(false);
	const [showUpdateModalSeries, setShowUpdateModalSeries] = useState(false);
	const [movie, setMovie] = useState({ id: "", nazwa: "", oskary: "", produkcjaId: 0, ocea: 0,filmId:0 });
	const [users, setUsers] = useState({ allUsers: {} });
	const [series, setSeries] = useState({ id: "", nazwa: "", odcinki: 0, produkcjaId: 0, sezony: 0, ocea: 0 });
	const [addMovie, setAddMovie] = useState({ nazw:"", opi: "", zdjeci: "", kategori: 1, edukacyjn: false, oskar: 0 });
	const [addSeries, setAddSeries] = useState({ nazw:"", opi: "", zdjeci: "", kategori: 1, edukacyjn: false, odcink: 0, sezon:0 , emm:0});
	const [updateMovie, setUpdateMovie] = useState({ id: "", nazwa: "", oskary: "", produkcjaId: 0, ocea: 0,filmId:0 });
	const [updateSeries, setUpdateSeries] = useState({ id: "", nazwa: "", odcinki: 0, produkcjaId: 0, sezony: 0, ocea: 0 });
	
	const value = { showModalLogin, setShowModalLogin, users, setUsers, 
		showModalMovie, setShowModalMovie, movie, setMovie, 
		showModalSeries, setShowModalSeries, series, setSeries, 
		showAddModalMovie, setShowAddModalMovie, addMovie, setAddMovie, 
		showUpdateModalMovie, setShowUpdateModalMovie, updateMovie, setUpdateMovie,
		showAddModalSeries, setShowAddModalSeries, addSeries, setAddSeries,
		showUpdateModalSeries, setShowUpdateModalSeries, updateSeries, setUpdateSeries
	};
	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};
