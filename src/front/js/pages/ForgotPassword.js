import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ForgotPassword = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.forgotPassword(email);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ backgroundColor: "#151515" }}>
                        <div className="card-body">
                            <h3 className="card-title text-center">Recuperar contraseña</h3>
                            <form onSubmit={handleSubmit} className="p-4 " style={{ maxWidth: '400px', margin: 'auto' }}>

                                <div className="my-3">
                                    <label className="form-label d-flex align-items-center text-start">
                                        <i className="fas fa-envelope mx-2" style={{ color: "#B197FC", fontSize: 24 }}></i>
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="nombre@ejemplo.com"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Enviar</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};