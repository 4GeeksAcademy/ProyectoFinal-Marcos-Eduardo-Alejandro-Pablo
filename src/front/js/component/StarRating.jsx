import React, { useState } from 'react';

const StarRating = ({ rating, onRate }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <span
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => onRate(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <i className="fa fa-star"></i>
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;