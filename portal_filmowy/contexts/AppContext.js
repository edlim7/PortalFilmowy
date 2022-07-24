import React, {createContext, useState} from 'react'
export const AppContext  = createContext();
export const AppContextProvider = ({ children }) => {
const [Age, setAge] = useState(1);

const value = { Age, setAge };
return(
<AppContext.Provider value={value}>{children}</AppContext.Provider>
);
};