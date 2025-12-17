import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [registeredUser, setRegisteredUser] = useState("");
    const [contacts, setContacts] = useState([]);

    const URL_CONSEGUIR_CONTACTS = "https://playground.4geeks.com/contact/agendas"


    const createAgenda = (name) => {
        fetch(`${URL_CONSEGUIR_CONTACTS}/${name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {

                if (res.status === 400) {
                    alert("La agenda ya esta creada, redirigiendo...")
                    console.error("La agenda ya existe (400)");
                    throw new Error("La agenda ya existe");
                }

                if (!res.ok || res.status === 422) {
                    alert("La agenda ya esta creada, redirigiendo...")
                    throw new Error("No se pudo crear la agenda");
                }
                alert("Se ha creado la agenda!")
                console.log("Se creó la agenda correctamente. Status:", res.status);
                return res.json();
            })
            .then(data => {
                console.log("Respuesta:", data);
                getContacts(name);
            })
            .catch(err => console.error("Error:", err.message));
    };

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
            getContacts,
            createAgenda
        }}>
            {children}
        </AppContext.Provider>
    );
};
