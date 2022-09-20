import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarIcon from "@mui/icons-material/Star";
import { fetchMenu } from "../../store";

export const Restaurant = ({ match }) => {
  const restaurants = useSelector((state) => state.restaurants);
  const dishes = useSelector((state) => state.dishes);
  const restaurant =
    restaurants.find((restaurant) => restaurant.id === +match.params.id) || {};
  const menu = dishes.filter((dish) => dish.restaurantId === restaurant.id);
  console.log(menu);
  return (
    <div className="m-10">
      <img className="w-2/3 h-60" src={restaurant.imageUrl}></img>
      <h2 className="mt-5 text-3xl font-bold">{restaurant.name}</h2>
      <p>
        {restaurant.priceRange} <FiberManualRecordIcon sx={{ fontSize: 8 }} />{" "}
        {restaurant.category}
      </p>
      {restaurant.score.length ? (
        <p>
          Rating: {restaurant.score} <StarIcon sx={{ fontSize: 18 }} />
        </p>
      ) : null}
      <p>{restaurant.address}</p>
    </div>
  );
};
