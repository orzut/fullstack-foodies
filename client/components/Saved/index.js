import React from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "../Pages/RestaurantCard";

const Saved = () => {
    const restaurants = useSelector(state => state.restaurants)
    const savedRestaurants = useSelector(state => state.savedRestaurants)
    console.log(savedRestaurants)
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
                {restaurants.map((restaurant) => {
                    /**
                     * TO DO DISPLAY SACVED RESTAURNTS .......
                     * .......................................
                     * .........................................
                     */
                    return <RestaurantCard key={restaurant.id} restaurant={restaurant} />;
                })}
            </div>
        </main>
    );
};

export default Saved;
