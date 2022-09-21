import React from "react";
import { useSelector } from "react-redux";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarIcon from "@mui/icons-material/Star";
import DishCard from "./DishCard";

export const Restaurant = ({ match }) => {
  const restaurants = useSelector((state) => state.restaurants);
  const dishes = useSelector((state) => state.dishes);
  const categories = useSelector((state) => state.categories);
  const restaurant =
    restaurants.find((restaurant) => restaurant.id === +match.params.id) || {};
  const menu =
    dishes.filter((dish) => dish.restaurantId === restaurant.id) || [];
  console.log(menu);
  return (
    <div className="m-10">
      <div>
        <img className="w-2/3 h-60" src={restaurant.imageUrl}></img>
        <h2 className="mt-5 text-2xl font-bold">{restaurant.name}</h2>
        <p className="text-slate-400">
          {restaurant.priceRange} <FiberManualRecordIcon sx={{ fontSize: 8 }} />{" "}
          {restaurant.category}
        </p>
        {restaurant.score ? (
          <p className="text-slate-400">
            Rating: {restaurant.score} <StarIcon sx={{ fontSize: 18 }} />
          </p>
        ) : null}
        <p className="text-slate-400">{restaurant.address}</p>
      </div>
      {/* loading menu */}
      <div>
        <ul>
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <h3 className="font-bold text-xl mt-3">{category.name}</h3>
                <ul className="flex flex-wrap">
                  {menu.map((dish) => {
                    if (dish.categoryId === category.id) {
                      return <DishCard key={dish.id} dish={dish} />;
                    }
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
