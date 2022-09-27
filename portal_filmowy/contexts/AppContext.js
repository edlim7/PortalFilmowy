import React, { createContext, useState } from "react";
export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
const [Kategoria, setKategoria] = useState("")

	const value = { Kategoria, setKategoria };
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
