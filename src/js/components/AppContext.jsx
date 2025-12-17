import { createContext, useState } from "react";

export const AppContext = createContext();

const BASE_URL = "https://playground.4geeks.com/contact/agendas";

export const AppProvider = ({ children }) => {

    const [registeredUser, setRegisteredUser] = useState("");
    const [contacts, setContacts] = useState([]);

    const getContacts = (name) => {
        if (!name) {
            console.warn("No se encuentra nombre de usuario para conseguir los contactos");
            setContacts([]);
            return;
        }
        fetch(`${URL_CONSEGUIR_CONTACTS}/${name}/contacts`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("No se pudieron conseguir los contactos")
                } else if (res.status === 422) {
                    throw new Error("No se pudieron conseguir los contactos")
                } else {
                    return res.json();
                }
            })
            .then(data => setContacts(Array.isArray(data) ? data : []))
            .catch(err => console.error("Error al obtener contactos:", err.message), setContacts([]))
    }

    return (
        <AppContext.Provider value={{
            registeredUser,
            setRegisteredUser,
            contacts,
            setContacts,
            getContacts
        }}>
            {children}
        </AppContext.Provider>
    );
};
