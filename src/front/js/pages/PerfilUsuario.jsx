import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { CardFavo } from '../component/CardFavo';

const PerfilUsuario = () => {
    const { store, actions } = useContext(Context);
    const [token, setToken] = useState(actions.getToken());
    const [favorites, setFavorites] = useState([]);

    const navigate = useNavigate();


    const handleLogout = () => {
        actions.logout();
        navigate('/');

    };
    useEffect(() => {
  
        actions.getCurrentUser();
    
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
                    <p><strong>ID: {store.currentUser && store.currentUser.id}</strong></p>
                </div>
                <div className="col-md-4 text-left">
                    <img src="https://dthezntil550i.cloudfront.net/f4/latest/f41908291942413280009640715/1280_960/1b2d9510-d66d-43a2-971a-cfcbb600e7fe.png" alt="Profile" className="img-fluid rounded-circle mb-3" />
                </div>
            </div>
            <div className="row">
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