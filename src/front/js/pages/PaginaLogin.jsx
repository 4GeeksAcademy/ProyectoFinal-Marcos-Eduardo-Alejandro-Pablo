import React, { useState, useContext } from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const PaginaLogin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.login(userInput);
        if (success) {
            navigate('/perfil/');
        } else {
            setErrorMessage("Error al iniciar sesión: correo electrónico o contraseña incorrectos.");
        }
    };
    return (

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{backgroundColor: "#151515"}}>
                        <div className="card-body">
                            <h3 className="card-title text-center">Iniciar sesión</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input type="email" className="form-control" id="email"

                                     value={userInput.email || ""}
                                     onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                                    
                                    required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="password"
                                    
                                    value={userInput.password || ""}
                                    onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                                    
                                    required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                                </div>
                            </form>
                            <p><Link to="/registro/">¿No estás registrado? Haz click aquí!</Link></p>
                           <p><Link to="/forgotpassword/">Recuperar contraseña</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    );
};

export default PaginaLogin;
