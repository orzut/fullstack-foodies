import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

function RestaurantModal({setIsRestaurantModalActive, activeRestaurantId}) {
    const restaurants = useSelector(state => state.restaurants);
    useEffect(() => {
        const selectedRestaurant = restaurants.find(restaurant => restaurant.id === activeRestaurantId);
        console.log(selectedRestaurant)
    }, [activeRestaurantId])
    const handleExitClick = () => {
        setIsRestaurantModalActive(false)
    }
    return (
        <div>
            Restaurant
            <button onClick={handleExitClick}>X</button>
        </div>
    )
};

export default RestaurantModal;