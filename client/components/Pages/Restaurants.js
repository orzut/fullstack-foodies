import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchSavedRestaurants} from '../../store';
import RestaurantCard from "./RestaurantCard";

const Restaurants = () => {
  const restaurants = useSelector((state) => state.restaurants.slice(0, 100));
  const savedRestaurants = useSelector(state => state.savedRestaurants)
  const savedRestaurantsId = savedRestaurants.map(restaurant => restaurant.restaurantId)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id) dispatch(fetchSavedRestaurants())
  },[auth.id,savedRestaurants.length])

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
          if (savedRestaurantsId.includes(restaurant.id)) {
            return <RestaurantCard key={restaurant.id} restaurant={restaurant} liked={true}/>
          } else {
            return <RestaurantCard key={restaurant.id} restaurant={restaurant} liked={false}/>
          }
        })}
      </div>
    </main>
  );
};

export default Restaurants;
