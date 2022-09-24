import React from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";

const Restaurants = () => {
  const restaurants = useSelector((state) => state.restaurants.slice(0, 100));
  return (
    <main>
    <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Fresh and Tasty</p>
                <h1>Our Restaurants</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Choose From {restaurants.length} Restaurants:</h1>
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
