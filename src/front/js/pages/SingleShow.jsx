import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleShow = () => {
   
    const [showData, setShowData] = useState([]);
    const { id } = useParams(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
                const data = await response.json();
                setShowData(data);
            } catch (error) {
                console.error("Error fetching show data:", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={showData.image?.original} alt={showData.name} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h1>{showData.name}</h1>
                    <p dangerouslySetInnerHTML={{ __html: showData.summary }}></p>
                    <p>Type: {showData.type}</p>
                    <p>Language: {showData.language}</p>
                    <p>Genres: {showData.genres?.join(', ')}</p>
                    <p>Status: {showData.status}</p>
                    <p>Runtime: {showData.runtime}</p>
                    <p>Premiered: {showData.premiered}</p>
                    <p>Ended: {showData.ended}</p>
                    <p>Rating: {showData.rating?.average}</p>
                    <p>Network: {showData.network?.name}</p>
                    <a href="€" className="btn btn-primary">Añadir a fav</a>
                </div>
            </div>
        </div>
    );
};

export default SingleShow;
