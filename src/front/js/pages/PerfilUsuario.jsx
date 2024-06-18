import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { CardFavo } from '../component/CardFavo';

const PerfilUsuario = () => {
    const { store, actions } = useContext(Context);
    const [token, setToken] = useState(actions.getToken());
    const [favorites, setFavorites] = useState([]);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const handleLogout = () => {
        actions.logout();
        navigate('/');
    };
    const handleUpdateUserName = async () => {
        try {
            await actions.updateUserName(userName);
            console.log('Nombre de usuario actualizado exitosamente');
        } catch (error) {
            console.error('Error actualizando el nombre de usuario:', error);
            console.log('Error actualizando el nombre de usuario');
        }
    };
    useEffect(() => {
        actions.getCurrentUser();
    }, []);
    useEffect(() => {
        if (store.currentUser) {
            setUserName(store.currentUser.user_name || '');
        }
    }, [store.currentUser]);
    useEffect(() => {
        if (store.favourites) {
            const promises = store.favourites.map(favourite =>
                fetch(`https://api.tvmaze.com/shows/${favourite.show_id}`)
                    .then(response => response.json())
            );
            Promise.all(promises)
                .then(favouritesData => setFavorites(favouritesData))
                .catch(error => console.error(error));
        }
    }, [store.favourites]);
    if (store.currentUser === null) {
        return (
            <div className="container text-center mt-5">
                <h1 className="text-danger">No estás autorizado</h1>
            </div>
        );
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8">
                    <p onClick={handleLogout}>Logout</p>
                    <h2>{store.currentUser && store.currentUser.email}</h2>
                    <p><strong>Nombre: {store.currentUser && store.currentUser.user_name}</strong></p>
                </div>
                <div className="col-md-4 text-left">
                    <img src="https://dthezntil550i.cloudfront.net/f4/latest/f41908291942413280009640715/1280_960/1b2d9510-d66d-43a2-971a-cfcbb600e7fe.png" alt="Profile" className="img-fluid rounded-circle mb-3" />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="userName">Nombre de Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary mt-2" onClick={handleUpdateUserName}>
                        Actualizar Nombre
                    </button>
                </div>
            </div>
            <div className="row mt-5">
                <h3>Favoritos:</h3>
                <div className="col d-flex gap-5 flex-wrap">
                    {favorites && favorites.map((favorite, index) => (
                        <CardFavo cardInfo={favorite} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default PerfilUsuario;