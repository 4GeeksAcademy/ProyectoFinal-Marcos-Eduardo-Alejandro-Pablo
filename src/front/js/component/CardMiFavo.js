import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const CardMiFavo = ({ cardInfo }) => {
    const { id, image, name, rating, summary, favourites } = cardInfo;
    const { store, actions } = useContext(Context);

    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        if (store.currentUser && store.currentUser.id) {
            setIsFavourite(store.favourites.some(fav => fav.show_id === id && fav.user_id === store.currentUser.id));
        }
    }, [store.favourites, store.currentUser]);

    const handleToggleFavourite = (event) => {
        event.preventDefault();
        const favourite = store.favourites.find(fav => fav.show_id === id && fav.user_id === store.currentUser.id);

        if (favourite) {
            actions.deleteFavourite(favourite.id, store.favourites);

        } else {
            actions.addFavourite(store.currentUser.id, show.id, store.favourites);

        }
    };

    return (
        <div className="item-card position-relative rounded-3" style={{ width: "250px", height: "350px" }}>
            <Link to={`/show/${id}`}>
                <img
                    src={image ? image.original : "https://via.placeholder.com/250x250"}
                    className="img-fluid"
                    alt={name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
            </Link>
            {/* <h4 className="position-absolute top-0 start-0 p-2" onClick={handleToggleFavourite}><i className={isFavourite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i></h4> */}
            {/* <h6 className="position-absolute bottom-0 end-0 p-2">{name} <i className="fa-solid fa-star"></i>{rating.average ? rating.average : "N/A"}</h6> */}
            <div className="description">{summary ? summary.replace(/<[^>]+>/g, '') : "Sin descripción."}</div>
        </div>
    );
};