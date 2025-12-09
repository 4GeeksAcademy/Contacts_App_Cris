import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [dataContacts, setDataContacts] = useState([]);

  const URL_CREATE_AGENDA = 'https://playground.4geeks.com/contact/agendas';

  const createAgenda = () => {
    return fetch(`${URL_CREATE_AGENDA}/Cristian`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Error al crear la nueva agenda");
        }
        console.log("funciona crear la agenda");
        return res.json();
      })
      .catch(getContacts());
  };

  const getContacts = () => {
    fetch(`${URL_CREATE_AGENDA}/Cristian/contacts`)
    .then(res => {
        if(!res.ok){
            throw new Error('No se ha podido conseguir los contactos')
        }
        console.log('se han conseguido los contactos')
        return res.json()
    })
    .then(data => setDataContacts(data))
    .catch(err => console.log(err))
  };

  useEffect(() => {
    createAgenda();
  }, []);

  return (
    <>
      <div>
        <Link to={"/"}>
          <button>Botón de volver al inicio</button>
        </Link>
      </div>

      <div>
        <h2>Contactos ({dataContacts.length})</h2>
        <ul>
          {dataContacts && dataContacts.length > 0 ? (
            dataContacts.map((contact, i) => (
              <li key={contact.id ?? i}>
                {contact.full_name ?? JSON.stringify(c)}
              </li>
            ))
          ) : (
            <li>No hay contactos</li>
          )}
        </ul>
        <Link to ={"/CreateContact"}>
          <button>
            Crear Contacto Nuevo
          </button>
        </Link>
      </div>
    </>
  );
};

export default Contact;
