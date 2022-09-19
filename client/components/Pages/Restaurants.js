import React from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";

const Restaurants = () => {
  const restaurants = useSelector((state) => state.restaurants.slice(0, 100));
  return (
    <main className="m-20">
      <div>
        <h1>Our Restaurants ({restaurants.length})</h1>
      </div>
      {/* Restaurant Listing Begins Here*/}
      <div className="flex flex-wrap justify-around">
        {restaurants.map((restaurant) => {
          return <RestaurantCard key={restaurant.id} restaurant={restaurant} />;
        })}
      </div>
    </main>
  );
};

export default Restaurants;
