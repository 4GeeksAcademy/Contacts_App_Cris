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

        const URL_CREAR_USUARIO = "https://playground.4geeks.com/contact/agendas";

        fetch(`${URL_CREAR_USUARIO}/${registeredUser}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, phone, email, address })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("No se pudo crear el contacto");
                }
                alert("Se ha creado el contacto correctamente");
                return res.json();
            })
            .then(newContact => {
                setContacts([...contacts, newContact]);
                setName("");
                setEmail("");
                setPhone("");
                setAddress("");
            })
            .catch(err => console.error(err));
    };


    return (
        <>
            <div className="form-wrapper">

                <form className="form-contact" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                    />
                    <input
                        type="text"
                        name="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                    />
                    <input
                        type="text"
                        name="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                    />
                    <button type="submit" className="m-3 btn btn-primary">Guardar contacto</button>
                </form>

                <Link to={"/"}>
                    <button className="btn-volver m-3 btn btn-danger">Volver atrás</button>
                </Link>
            </div>
        </>
    );
};

export default CreateContact;
