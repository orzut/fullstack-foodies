import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import RestaurantCard from "../Pages/RestaurantCard";
import {fetchSavedRestaurants} from "../../store";

const Saved = () => {
    const savedRestaurants = useSelector(state => state.savedRestaurants)
    const savedRestaurantsId = savedRestaurants.map(restaurant => restaurant.restaurantId)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.id) dispatch(fetchSavedRestaurants())
    },[auth.id,savedRestaurantsId.length])

    return (
        <main>
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <p>Fresh and Tasty</p>
                                <h1>Your Favorite Stuff</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1>Favorite Restaurants ({savedRestaurants.length})</h1>
            </div>
            {/* Restaurant Listing Begins Here*/}
            <div className="flex flex-wrap justify-around">
                {savedRestaurants.map((savedRestaurant) => {
                    if (savedRestaurantsId.includes(savedRestaurant.restaurantId)) {
                        return <RestaurantCard key={savedRestaurant.id}
                                               restaurant={savedRestaurant.restaurant}
                                               liked={true}/>
                    } else {
                        return <RestaurantCard key={savedRestaurant.restaurantId}
                                               restaurant={savedRestaurant.restaurant}
                                               liked={false}/>
                    }
                })}
            </div>
        </main>
    );
};

export default Saved;
