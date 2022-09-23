import React from "react";
import { useSelector } from "react-redux";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarIcon from "@mui/icons-material/Star";
import DishCard from "./DishCard";
import { NavHashLink } from "react-router-hash-link";
import { CardContent, Typography, Card, Rating } from "@mui/material";

export const Restaurant = ({ match }) => {
  const restaurants = useSelector((state) => state.restaurants);
  const dishes = useSelector((state) => state.dishes);
  const categories = useSelector((state) => state.categories);
  const reviews = useSelector((state) => state.reviews);

  const restaurant =
    restaurants.find((restaurant) => restaurant.id === match.params.id) || {};
  const menu =
    dishes.filter((dish) => dish.restaurantId === restaurant.id) || [];
  const restaurantReviews =
    reviews.filter((review) => review.restaurantId === restaurant.id) || [];
  console.log(restaurantReviews);
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
      <nav className="sticky top-0 bg-white border-y m-2 p-2 text-xl">
        {categories.map((category) => {
          return (
            <NavHashLink
              key={category.id}
              smooth
              to={`/restaurants/${restaurant.id}#${category.name}`}
              activeStyle={{
                fontWeight: "bold",
                borderBottom: "2px solid black",
              }}
              className="m-2"
            >
              {category.name}
            </NavHashLink>
          );
        })}
      </nav>

      {/* loading menu */}
      <div className="mt-4">
        <ul>
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <h3 className="font-bold text-xl mt-3" id={category.name}>
                  {category.name}
                </h3>
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
      <div className="mt-4">
        <h3 className="text-xl font-bold">Reviews</h3>
        {restaurant.score ? (
          <p className="text-slate-400">
            Rating: {restaurant.score} <StarIcon sx={{ fontSize: 18 }} />
          </p>
        ) : null}
        <p>{restaurantReviews.length} reviews</p>
        <ul className="flex justify-around">
          {restaurantReviews.slice(0, 3).map((review) => {
            return (
              <Card sx={{ width: 300 }} key={review.id}>
                <CardContent>
                  <Typography variant="h6">
                    {review.user.firstName} {review.user.lastName}
                  </Typography>
                  <Rating name="read-only" value={review.rating} readOnly />
                  <Typography>{review.review}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
