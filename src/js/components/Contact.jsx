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
    setContacts
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

  return (
    <>
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
    </>
  )
};

export default Contact;
