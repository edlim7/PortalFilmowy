import React, { createContext, useState } from "react";
export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
	const [Menu, setMenu] = useState("listaFilmow");

	const value = { Menu, setMenu };
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
