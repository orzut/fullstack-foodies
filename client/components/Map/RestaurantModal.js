import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './RestaurantModal.css';

function RestaurantModal({setIsRestaurantModalActive, activeRestaurantId, distance, duration}) {
    const [selectedRestaurant, setSelectedRestaurant]=useState();
    const restaurants = useSelector(state => state.restaurants);
    useEffect(() => {
        if (activeRestaurantId) setSelectedRestaurant(restaurants.find(restaurant => restaurant.id === activeRestaurantId))
    }, [activeRestaurantId])
    const handleExitClick = () => {
        setIsRestaurantModalActive(false)
    }
    return (
        <div>
            {selectedRestaurant ?
                    (
                        <div className='restaurant-modal-wrapper'>
                            <div>
                                <div className="restaurant-modal-img">
                                    <img width='100%' src={selectedRestaurant.imageUrl}></img>
                                </div>
                                <div className="restaurant-modal-name">
                                    <Link to={`/restaurants/${selectedRestaurant.id}`}>{selectedRestaurant.name}</Link>
                                </div>
                                <div className="restaurant-modal-address">{selectedRestaurant.address}</div>
                                <div>Distance: {distance}</div>
                                <div>Duration: {duration}</div>
                                <div>Score: {selectedRestaurant.score}</div>
                                <div>{selectedRestaurant.description}</div>
                            </div>
                            <button className='restaurant-modal-exit-button' onClick={handleExitClick}>X</button>
                        </div>
                    ) :
                    null
            }
        </div>
    )
};

export default RestaurantModal;