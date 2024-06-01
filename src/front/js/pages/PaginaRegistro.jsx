import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const PaginaRegistro = () => {

    const { store, actions } = useContext(Context);
    const [userInput, setUserInput] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.registro(userInput)
            .then(() => {
                console.log(userInput);
                window.location.href = "/perfil/";
            });
    };


    return (
       
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{backgroundColor: "#151515"}}>
                        <div className="card-body">
                            <h3 className="card-title text-center">Regístrate</h3>
                            <form onSubmit={handleSubmit}  >
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input type="email" className="form-control" id="email" required 
                                    
                                    value={userInput.email || ""}
                                    onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                              
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="password" required
                                      value={userInput.password || ""}
                                      onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-block">Regístrate</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PaginaRegistro;
