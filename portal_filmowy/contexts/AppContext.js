import React, { createContext, useState } from "react";
export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
const [Kategoria, setKategoria] = useState("")
const [Uzytkownicy, setUzytkownicy] = useState("")
const [Oceny, setOceny] = useState("")
const [zalogowany, setZalogowany] = useState({zal:false})

	const value = { Kategoria, setKategoria,Uzytkownicy,setUzytkownicy, zalogowany, setZalogowany,Oceny, setOceny };
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
