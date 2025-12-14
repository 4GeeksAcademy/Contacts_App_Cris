import React from "react";
import { Link } from "react-router-dom";


const Error = () => {
    return (
        <>
            <div className="error-title">
                <h1>404</h1>
                <div className="error-title-text">
                    <h2>Ooooppppss!!!</h2>
                    <h3>¡No hemos encontrado <br></br> la pagina que buscas!😢</h3>
                    <Link to={"/"}>
                        <button className="btn btn-secondary">
                            Volver a inicio
                        </button>
                    </Link>
                </div>

            </div>

        </>
    )
}

export default Error;