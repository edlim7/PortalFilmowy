import React, {createContext, useState} from 'react'
export const MovieContext  = createContext();
export const MovieContextProvider = ({ children }) => {
const [movieModal, setMovieModal] = useState(false);

const value = { movieModal, setMovieModal };
return(
<MovieContext.Provider value={value}>{children}</MovieContext.Provider>
);
};