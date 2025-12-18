import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "./AppContext";

const Contact = () => {

  const URL_CREAR_USUARIO = "https://playground.4geeks.com/contact/agendas";

  const { contactId } = useParams()
  console.log("id del contacto: " + contactId);

  const [contact, setContact] = useState(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const {
    registeredUser,
    setRegisteredUser,
    contacts,
    setContacts,
    getContacts,
    createAgenda
  } = useContext(AppContext);

  useEffect(() => {
    if (contactId) {
      setContact(contacts.find(item => item.id == contactId))
    }
  }, [contactId, contacts])

  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setEmail(contact.email || "");
      setPhone(contact.phone || "");
      setAddress(contact.address || "");
    }
  }, [contact]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${URL_CREAR_USUARIO}/${registeredUser}/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, phone, email, address })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("No se pudo actualizar el contacto");
        }
        alert("Se ha actualizado el contacto correctamente");
        return res.json();
      })
      .then(newContact => {
        setContacts(
          contacts.map(cont => cont.id == contactId ? newContact : cont)
        );
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
      })
      .catch(err => console.error(err));
  }

  const deleteContact = (name, id) => {
    fetch(`${URL_CREAR_USUARIO}/${name}/contacts/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.status === 500) {
          throw new Error("No se pudo eliminar el contacto");
        }else{
          alert("Se ha eliminado el contacto");
        }
      })
      .then(() => {
        getContacts(name);
      })
      .catch(err => console.error(err.message));
  };


  return (
    <>
      <h1>Edita tu contacto</h1>
      <div className="form-wrapper">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_4Uxp9EWg0qTCJVs6efAjd85UpcL9nfBuOQ&s"
          alt="contact"
          className="contact-avatar"
        />
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
        <button className="btn btn-danger button-trash" onClick={() => deleteContact(registeredUser, contactId)}><span className="fa-solid fa-trash-can"></span></button>
      </div>
    </>
  )
};

export default Contact;
