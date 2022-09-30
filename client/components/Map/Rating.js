import React, { useState } from 'react';
import './Rating.css';
const Rating = ({rating, setRating, ratingType, ratingRange}) => {
    // const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="star-rating">
            {[...Array(ratingRange)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => setRating(oldValues => ({...oldValues, [`${ratingType}`]: index}))}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        {ratingType==='score'? <span className="star">&#9733;</span> :
                            (ratingType==='priceRange'?<span className="dollar">$</span> : '')}
                    </button>
                );
            })}
        </div>
    );
};

export default Rating
