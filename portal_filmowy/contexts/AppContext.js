import React, { createContext, useState } from "react";
export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
const [Kategoria, setKategoria] = useState("")
const [Uzytkownicy, setUzytkownicy] = useState("")
const [Oceny, setOceny] = useState("")
const [NazwyProdukcji, setNazwyProdukcji] = useState("")
const [zalogowany, setZalogowany] = useState({zal:false})
const [searchTerm, setSearchTerm] = useState('');

	const value = { Kategoria, setKategoria,Uzytkownicy,setUzytkownicy, zalogowany, setZalogowany,Oceny, setOceny,searchTerm, setSearchTerm,NazwyProdukcji, setNazwyProdukcji };
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
