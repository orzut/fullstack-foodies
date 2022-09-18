import React from "react";
import { useSelector } from "react-redux";

const Restaurants = (props) => {
  const restaurants = useSelector((state) => state.restaurants.slice(0, 100));
  console.log(props);
  return (
    <main>
      <div>
        <h1>Our Restaurants ({restaurants.length})</h1>
      </div>
      {/* Restaurant Listing Begins Here*/}
      <div>
        {restaurants.map((restaurant) => {
          return (
            <div key={restaurant.id}>
              <div>
                <div>
                  <p>{restaurant.name}</p>
                  <p>${restaurant.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Restaurants;
