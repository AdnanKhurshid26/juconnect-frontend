import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState({
        profile:null,
        recommended:null,
        recent:null,
        frequent:null,
    });

    return (
        <GlobalContext.Provider value={{globalState, setGlobalState}}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };