import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const PerfilUsuario = () => {
    const { store, actions } = useContext(Context);
    console.log(store.currentUser);
    const [token, setToken] = useState(actions.getToken());
    const navigate = useNavigate();

    useEffect(() => {
        actions.getCurrentUser();

    }, [actions]);

    const handleLogout = () => {
        actions.logout();
        navigate('/');

    };

    useEffect(() => {
        setToken(actions.getToken());
    }, []);

    if (!token) {
        return (
            <div className="container text-center mt-5">
                <h1 className="text-danger">No estás autorizado</h1>
            </div>
        );
    }
    console.log(store.currentUser.id);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8">
                    <p onClick={handleLogout}>Logout</p>
                    <h2>{store.currentUser && store.currentUser.email}</h2>
                    <p><strong>ID: {store.currentUser && store.currentUser.email}</strong></p>
                </div>
                <div className="col-md-4 text-left">
                    <img src="https://via.placeholder.com/150" alt="Profile" className="img-fluid rounded-circle mb-3" />
                </div>
            </div>
            <div className="row">
                <h3>Favoritos:</h3>
            </div>
        </div>
    );
};

export default PerfilUsuario;