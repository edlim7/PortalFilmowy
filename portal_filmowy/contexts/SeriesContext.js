import React, {createContext, useState} from 'react'
export const SeriesContext  = createContext();
export const SeriesContextProvider = ({ children }) => {
const [seriesModal, setSeriesModal] = useState(false);

const value = { seriesModal, setSeriesModal };
return(
<SeriesContext.Provider value={value}>{children}</SeriesContext.Provider>
);
};