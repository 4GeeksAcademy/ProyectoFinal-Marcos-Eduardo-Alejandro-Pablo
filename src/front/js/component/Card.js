import React from "react";
import { Link } from "react-router-dom";

export const Card = ({ cardInfo }) => {
    const { show } = cardInfo;
    return (
        <Link to={`/show/${show.id}`}>
            <div className="item-card position-relative rounded-3" style={{ width: "250px", height: "350px" }}>
                <img
                    src={show.image ? show.image.original : "https://via.placeholder.com/250x250"}
                    className="img-fluid"
                    alt={show.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
                <h4 className="position-absolute top-0 start-0 p-2"><i className="fa-regular fa-heart"></i></h4>
                <h7 className="position-absolute bottom-0 end-0 p-2">{show.name} <i className="fa-solid fa-star"></i>{show.rating.average ? show.rating.average : "N/A"}</h7>
                <div className="description">{show.summary ? show.summary.replace(/<[^>]+>/g, '') : "Sin descripción."}</div>
            </div>
        </Link>
    );
};
