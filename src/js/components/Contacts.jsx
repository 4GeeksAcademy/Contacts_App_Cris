import React from "react";
import { Link } from "react-router-dom";

const Contacts = () =>{
    return (
        <>
        <Link to={"/Contact"}>
            <button>Ir a Contact</button>
        </Link>
        </>
    )
}

export default Contacts;