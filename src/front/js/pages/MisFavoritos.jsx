import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { CardFavo } from '../component/CardFavo';

const PerfilUsuario = () => {
    const { store, actions } = useContext(Context);
    const [token, setToken] = useState(actions.getToken());
    const [favorites, setFavorites] = useState([]);

    const navigate = useNavigate();

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