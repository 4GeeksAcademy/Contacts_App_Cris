import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";

const CreateContact = () => {

    const {
        registeredUser,
        setRegisteredUser,
        contacts,
        setContacts
    } = useContext(AppContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const URL_CREAR_USUARIO = "https://playground.4geeks.com/contact/agendas"

        fetch(`${URL_CREAR_USUARIO}/${registeredUser}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, phone, email, address })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('No se pudo crear el contacto')
                }

                return res.json();
            })
            .then(newContact => setContacts([...contacts, newContact]))
            .catch(err => console.error(err))


    };

    return (
        <>
            <form className="d-flex flex-column mx-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                />
                <input
                    type="text"
                    name="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                />
                <input
                    type="text"
                    name="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                />
                    <button type="submit" className="m-3">Guardar contacto</button>
            </form>

            <Link to={"/"}>
                <button className="m-3">Volver atrás</button>
            </Link>
        </>
    );
};

export default CreateContact;
