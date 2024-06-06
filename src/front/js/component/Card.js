import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = ({ cardInfo }) => {
    const { show } = cardInfo;
    const { store, actions } = useContext(Context);

    const [isFavourite, setIsFavourite] = useState(false);
    console.log(store.currentUser);
    console.log(store.favourites);
    console.log(store
    );
    useEffect(() => {
        console.log('store.favourites:', store.favourites);
        setIsFavourite(store.favourites.some(fav => fav.show_id === show.id && fav.user_id === store.currentUser.id));
    }, [store.favourites]);

    const handleToggleFavourite = (event) => {
        event.preventDefault();
        const favourite = store.favourites.find(fav => fav.show_id === show.id && fav.user_id === store.currentUser.id);
        console.log('favourite:', favourite); // Log favourite
        if (favourite) {
            actions.deleteFavourite(favourite.id, store.favourites);
            console.log("deleted")
        } else {
            actions.addFavourite(store.currentUser.id, show.id, store.favourites);
            console.log("added")
        }
    };

    return (
        <div className="item-card position-relative rounded-3" style={{ width: "250px", height: "350px" }}>
            <Link to={`/show/${show.id}`}>
                <img
                    src={show.image ? show.image.original : "https://via.placeholder.com/250x250"}
                    className="img-fluid"
                    alt={show.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
            </Link>
            <h4 className="position-absolute top-0 start-0 p-2" onClick={handleToggleFavourite}><i className={isFavourite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i></h4>
            <h6 className="position-absolute bottom-0 end-0 p-2">{show.name} <i className="fa-solid fa-star"></i>{show.rating.average ? show.rating.average : "N/A"}</h6>
            <div className="description">{show.summary ? show.summary.replace(/<[^>]+>/g, '') : "Sin descripción."}</div>
        </div>
    );
};