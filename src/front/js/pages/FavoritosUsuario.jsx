import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CardFavo } from '../component/CardFavo';

const FavoritosUsuario = () => {
    const { userId } = useParams();
    const [favorites, setFavorites] = useState([]);
    const location = useLocation();
    const urlRef = useRef(null);

    useEffect(() => {
        fetch(process.env.BACKEND_URL + `/api/users/${userId}/favoritos`)
            .then(response => response.json())
            .then(data => setFavorites(data))
            .catch(error => console.error(error));
    }, [userId]);

    const handleCopy = () => {
        urlRef.current.select();
        document.execCommand('copy');
    };

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
                            <CardFavo cardInfo={favorite} key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritosUsuario;