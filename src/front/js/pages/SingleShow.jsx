import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const SingleShow = () => {

    const [showData, setShowData] = useState([]);
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [inputValue, setInputValue] = useState("")
    const [Todolist, setTodolist] = useState([])

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

    if (!showData) return <div>Loading...</div>;


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


                    <div>
                        <input
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && inputValue.trim().length > 0) {
                                    const currentUser = actions.getCurrentUser();
                                    setTodolist(Todolist.concat([{ text: inputValue, userId: currentUser.id }]));
                                    setInputValue("");
                                }
                            }}
                            placeholder="Deja tu opinión"
                        />
                        {Todolist.map((item, index) => (
                            <div key={index}>
                                {item.text} <strong>(Usuario ID: {item.userId})</strong>
                                <i
                                    className="fas fa-trash-alt float-end"
                                    onClick={() => setTodolist(Todolist.filter((_, currentIndex) => index !== currentIndex))}
                                ></i>
                            </div>
                        ))}
                    </div>


                    <button onClick={() => { actions.setFavoritas(showData) }} className="btn btn-primary" >Añadir a fav</button>
                </div>
            </div>
        </div>
    );
};

export default SingleShow;
