import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

function RestaurantModal({setIsRestaurantModalActive, activeRestaurantId}) {
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
                        <div>
                            <div>
                                <div>{selectedRestaurant.name}</div>
                                <div>{selectedRestaurant.address}</div>
                                <div>{selectedRestaurant.score}</div>
                                <div>{selectedRestaurant.description}</div>
                            </div>
                            <button onClick={handleExitClick}>X</button>
                        </div>
                    ) :
                    null
            }
        </div>
    )
};

export default RestaurantModal;