import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const { user_uuid } = useParams();
    const { actions } = useContext(Context);
    //const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.resetPassword(password, user_uuid)
            console.log(user_uuid)
            console.log(password, "contraseña")
            alert("Password has been reset");
            //navigate("/login");
        } catch {
            alert("Error resetting password");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: '400px', margin: 'auto', backgroundColor: '#f8f9fa' }}>
            <h2 className="mb-4 text-center">Restablecer Contraseña</h2>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label d-flex align-items-center text-start">
                    <i className="fas fa-lock mx-2" style={{ color: "#B197FC", fontSize: 24 }}></i>
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Restablecer</button>
        </form>
    );
};