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





//ARRIBA CÓDIGO ALEX

//ABAJO COMENTARIOS



















/* 
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Comment from "../component/Comment";
import StarRating from "../component/StarRating.jsx";
const SingleShow = () => {

    const [showData, setShowData] = useState([]);
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [inputValue, setInputValue] = useState("")
    const [Todolist, setTodolist] = useState([])
    const [UserData, setUserData] = useState([null])
    const [rating, setRating] = useState(0);

    useEffect(() => {

        setUserData(store.currentUser)

    }, [store.currentUser]);

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
                    <div className="Rating">
                        <input className="Input"
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            onKeyUp={(e) => {
                                if (e.key === "Enter" && inputValue.trim().length > 0) {

                                    console.log(UserData);
                                    setTodolist(Todolist.concat([{ text: inputValue, userId: UserData.id }]));
                                    setInputValue("");
                                }
                            }}
                            placeholder="Comparte tu opinión"
                        />
                        <StarRating rating={rating} onRatingChange={setRating} />
                        {Todolist.map((item, index) => (
                            <Comment
                                key={index}
                                text={item.text}
                                userId={item.userId}
                                onDelete={() => setTodolist(Todolist.filter((_, i) => i !== index))}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleShow;
