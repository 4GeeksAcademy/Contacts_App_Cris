import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";

const Contacts = () => {

    const [user, setUser] = useState("");

    const {
        registeredUser,
        setRegisteredUser,
        contacts,
        setContacts,
        getContacts,
        createAgenda
    } = useContext(AppContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        createAgenda(user)
        if (user.trim() === "") return alert("Debes poner un nombre");
        setRegisteredUser(user);
        setUser("");

    };

    const handleSignOut = () => {
        alert("Se ha cerrado sesion");
        setRegisteredUser("");
        setContacts([]);
        setUser("");
    };

    console.log(contacts)

    return (
        <>
            {registeredUser && <div className="text-center">
                <h1>{`Lista de ${registeredUser}`}</h1>
                <div className="sign-out">
                    <button className="btn btn-danger" onClick={handleSignOut}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
            }
            {!registeredUser && (
                <div className="container-register">

                    <div className="text-center my-5">
                        <h1>Necesitas registrar primero tu nombre para crear la agenda.</h1>
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
                                        <h2 className="modal-title fs-5" id="exampleModalLabel">
                                            Registrate
                                        </h2>
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
                </div>
            )}
            {contacts.length > 0 &&
                <div className="contacts-header">
                    <h2>Contactos</h2>

                    <Link to={"/CreateContact"}>
                        <button className="create-contact-btn">
                            Crear Usuario
                        </button>
                    </Link>
                </div>
            }

            <div className="contacts-container">
                {contacts.length > 0 && contacts.map((contact) => (
                    <div className="contact-card" key={contact.id}>

                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_4Uxp9EWg0qTCJVs6efAjd85UpcL9nfBuOQ&s"
                            alt={contact.name || "contact"}
                            className="contact-avatar"
                        />

                        <div className="contact-info">
                            <p className="contact-name"><span class="fa-regular fa-user mx-2"></span>{contact.name}</p>
                            <p className="contact-email"><span class="fa-regular fa-envelope mx-2"></span>{contact.email}</p>
                            <p className="contact-phone"><span class="fa-solid fa-mobile-screen-button mx-2"></span>{contact.phone}</p>
                            <p className="contact-address"><span class="fa-solid fa-location-dot mx-2"></span>{contact.address}</p>
                        </div>
                        <div className="options-card" key={contact.id}>
                            <Link to={"/Contact/" + contact.id}>
                                <button className="btn btn-secundary button-option"><span className="fa-solid fa-pencil"></span></button>
                            </Link>
                        </div>

                    </div>
                ))}
            </div>


            {contacts.length === 0 && registeredUser &&
                <div className="register-empty text-center">
                    <div>
                        <p>No tienes contactos actualmente</p>
                        <p>Si quieres crear un contacto debes ir a <b><i>"Crear Contactos"</i></b></p>
                        <p>En el boton de abajo</p>
                        <h3>👇</h3>
                    </div>
                    <Link to={"/CreateContact"}>
                        <button className="btn btn-primary">Crear Usuario</button>
                    </Link>
                </div>
            }
        </>
    );
};

export default Contacts;
