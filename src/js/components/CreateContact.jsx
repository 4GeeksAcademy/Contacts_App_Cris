import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateContact = () => {

    const [datas, setDatas] = useState({
        "name": "string",
        "phone": "",
        "email": "",
        "address": ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`https://playground.4geeks.com/contact/agendas/Cristian/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ contacts: { ...datas } })
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
        setDatas({
            ...datas,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <form className="d-flex flex-column mx-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={datas.nombre}
                    name="nombre"
                    onChange={handleChange}
                    placeholder="Nombre"
                />
                <input
                    type="text"
                    value={datas.apellido}
                    name="apellido"
                    onChange={handleChange}
                    placeholder="Apellidos"
                />
                <input
                    type="number"
                    value={datas.numero}
                    name="numero"
                    onChange={handleChange}
                    placeholder="Número"
                />
                <input
                    type="email"
                    value={datas.email}
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
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
