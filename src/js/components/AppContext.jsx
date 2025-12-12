import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [registeredUser, setRegisteredUser] = useState("");
    const [contacts, setContacts] = useState([]);

    return (
        <AppContext.Provider value={{
            registeredUser,
            setRegisteredUser,
            contacts,
            setContacts
        }}>
            {children}
        </AppContext.Provider>
    );
};
