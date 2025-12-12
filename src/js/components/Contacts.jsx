import React, { useEffect, useState } from "react";

const Contacts = () => {
    const [user, setUser] = useState("");
    const [registeredUser, setRegisteredUser] = useState("");

    const [contacts, setContacts] = useState([])

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
                console.error("La agenda ya existe (400)");
                throw new Error("La agenda ya existe");
            }

            if (!res.ok || res.status === 422) {
                throw new Error("No se pudo crear la agenda");
            }

            console.log("Se creó la agenda correctamente. Status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Respuesta:", data);
            getContacts(name);
        })
        .catch(err => console.error("Error:", err.message));
        //Hola
};


    const getContacts = (name) => {
        fetch(`${URL_CONSEGUIR_CONTACTS}/${name}/contacts`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("No se pudieron conseguir los contactos")
                } else if (res.status === 422) {
                    throw new Error("No hay contactos");
                } else {
                    return res.json();
                }
            })
            .then(data => setContacts(data))
            .catch(err => console.error(err + res.status))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createAgenda(user)
        if (user.trim() === "") return alert("Debes poner un nombre");
        setRegisteredUser(user);
        setUser("");

    };
    return (
        <>
            {registeredUser && <div className="text-center">
                <h1>{`Lista de ${registeredUser}`}</h1>
            </div>
            }
            {!registeredUser && (
                <div className="text-center my-5">
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        Registrate
                    </button>

                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                                        Registrate
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            value={user}
                                            onChange={(e) => setUser(e.target.value)}
                                            placeholder="Pon tu nombre"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            data-bs-dismiss="modal"
                                        >
                                            Registrar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Contacts;
