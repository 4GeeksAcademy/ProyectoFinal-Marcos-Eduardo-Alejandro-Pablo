import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CardMiFavo } from '../component/CardMiFavo';
import { Context } from '../store/appContext';


const FavoritosUsuario = () => {
    const { store, actions } = useContext(Context);
    const { userId } = useParams();
    const [favorites, setFavorites] = useState([]);
    const location = useLocation();
    const urlRef = useRef(null);

    useEffect(() => {
        fetch(process.env.BACKEND_URL + `/api/users/${userId}/favoritos`)
            .then(response => response.json())
            .then(favorites => {

                const fetchPromises = favorites.map(favorite =>
                    fetch(`https://api.tvmaze.com/shows/${favorite.show_id}`)
                        .then(response => response.json())
                );


                return Promise.all(fetchPromises);
            })
            .then(shows => setFavorites(shows))
            .catch(error => console.error(error));
    }, [userId]);

    const handleCopy = () => {
        urlRef.current.select();
        document.execCommand('copy');
    };

    if (store.currentUser === null) {
        return (
            <div className="container text-center mt-5">
                <h1 className="text-danger">Necesitas estar logueado para ver los favoritos de otras personas y compartir los tuyos.</h1>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <h3>Favoritos del usuario {userId}:</h3>
                <input ref={urlRef} value={window.location.origin + location.pathname} readOnly />
                <button onClick={handleCopy}>Copy URL</button>
                {favorites.length === 0 ? (
                    <p>El usuario no existe o no tiene favoritos.</p>
                ) : (
                    <div className="col d-flex gap-5 flex-wrap">
                        {favorites.map((favorite, index) => (
                            <CardMiFavo cardInfo={favorite} key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritosUsuario;