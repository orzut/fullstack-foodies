import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../../store";

const Restaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants.slice(0, 100));

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

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
