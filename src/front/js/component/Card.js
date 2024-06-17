import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import MyModal from "./MyModal";


export const Card = ({ cardInfo }) => {
    const { show } = cardInfo;
    const { store, actions } = useContext(Context);

    const [isFavourite, setIsFavourite] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {

        setShowModal(false);
    }
    useEffect(() => {
        setIsFavourite(store.favourites.some(fav => fav.show_id === show.id && fav.user_id === store.currentUser.id));
    }, [store.favourites]);

    const handleToggleFavourite = async () => {
        if (!store.currentUser) {
            setShowModal(true);

            console.log("deberia")
            return;
        }
        event.preventDefault();
        const favourite = store.favourites.find(fav => fav.show_id === show.id && fav.user_id === store.currentUser.id);

        if (favourite) {
            actions.deleteFavourite(favourite.id, store.favourites);

        } else {
            actions.addFavourite(store.currentUser.id, show.id, store.favourites);

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
            <MyModal show={showModal} onHide={handleCloseModal} />
        </div>
    );
};