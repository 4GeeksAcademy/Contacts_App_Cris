import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateContact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const URL_CREAR_USUARIO = "https://playground.4geeks.com/contact/agendas"

        fetch(`${URL_CREAR_USUARIO}/Cristian/contacts`, {
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
            .then(data => console.log(data))
            .catch(err => console.error(err))


    };

    const handleChange = (event) => {
        if (event.target.name === "Name") setName(event.target.value);
        if (event.target.name === "Email") setEmail(event.target.value);
        if (event.target.name === "Phone") setPhone(event.target.value);
        if (event.target.name === "Address") setAddress(event.target.value);
    };

    return (
        <>
            <form className="d-flex flex-column mx-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Name"
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="Email"
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                />
                <input
                    type="text"
                    name="Phone"
                    onChange={handleChange}
                    placeholder="Phone"
                />
                <input
                    type="text"
                    name="Address"
                    onChange={handleChange}
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
