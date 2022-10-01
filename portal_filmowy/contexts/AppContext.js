import React, { createContext, useState } from "react";
export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
const [Kategoria, setKategoria] = useState("")
const [Uzytkownicy, setUzytkownicy] = useState("")
const [zalogowany, setZalogowany] = useState({zal:false})
const [ZalogowanyUzytkownik, setZalogowanyUzytkownik] = useState({ id: "", log: "", hasl: "", emai: "", typKont: 0});

	const value = { Kategoria, setKategoria,Uzytkownicy,setUzytkownicy,ZalogowanyUzytkownik, setZalogowanyUzytkownik, zalogowany, setZalogowany };
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
