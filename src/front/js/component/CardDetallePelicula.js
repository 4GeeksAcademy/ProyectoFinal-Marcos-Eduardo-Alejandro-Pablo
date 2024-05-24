import React from "react";

export const CardDetallePelicula = ({ peliculaInfo }) => {
    const { pelicula } = peliculaInfo;

    return (
        <div className="detalle-pelicula-card position-relative rounded-3" style={{ width: "100%", height: "100%" }}>
            <img
                src={pelicula.image ? pelicula.image.original : "https://via.placeholder.com/250x250"}
                className="img-fluid"
                alt={pelicula.name}
                style={{ width: "100%", height: "50%", objectFit: "cover", objectPosition: "center" }}
            />
            <div className="card-body">
                <h5 className="card-title">{pelicula.name}</h5>
                <p className="card-text">Género: {pelicula.genre ? pelicula.genre : "N/A"}</p>
                <p className="card-text">Director: {pelicula.director ? pelicula.director : "N/A"}</p>
                <p className="card-text">Fecha de lanzamiento: {pelicula.releaseDate ? pelicula.releaseDate : "N/A"}</p>
                <p className="card-text">Duración: {pelicula.duration ? pelicula.duration : "N/A"} minutos</p>
                <p className="card-text">Calificación: {pelicula.rating && pelicula.rating.average ? pelicula.rating.average : "N/A"}</p>
                <p className="card-text">{pelicula.summary ? pelicula.summary.replace(/<[^>]+>/g, '') : "Sin descripción."}</p>
            </div>
        </div>
    );
};