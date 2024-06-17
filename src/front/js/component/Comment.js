import React, { useState } from 'react';
import PropTypes from "prop-types";

const Comment = ({ text, userId, onDelete }) => {
    const [rating, setRating] = useState(0);

    const handleRating = (rate) => {
        setRating(rate);
    };

    return (
        <div className="comment-box">
            <p>{text} <strong>(Usuario ID: {userId})</strong></p>
            <div className="stars">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <span
                            key={index}
                            className={index <= rating ? "on" : "off"}
                            onClick={() => handleRating(index)}
                        >
                            <i className="fa fa-star"></i>
                        </span>
                    );
                })}
            </div>
            <i
                className="fas fa-trash-alt"
                onClick={onDelete}
            ></i>
        </div>
    );
};

Comment.propTypes = {
    text: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Comment;