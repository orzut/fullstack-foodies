import React from "react";
import { useSelector } from "react-redux";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Card,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

const Restaurants = (props) => {
  const restaurants = useSelector((state) => state.restaurants.slice(0, 100));
  return (
    <main className="m-20">
      <div>
        <h1>Our Restaurants ({restaurants.length})</h1>
      </div>
      {/* Restaurant Listing Begins Here*/}
      <div className="flex flex-wrap justify-around">
        {restaurants.map((restaurant) => {
          return (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <Card sx={{ width: 320, height: 220, m: 1 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={restaurant.imageUrl}
                    sx={{ height: 110 }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{ mb: 0 }}
                    >
                      {restaurant.name.slice(0, restaurant.name.indexOf("("))}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.priceRange} {restaurant.category}
                    </Typography>
                    {restaurant.score ? (
                      <Typography variant="body2" color="text.secondary">
                        Rating: {restaurant.score}{" "}
                        <StarIcon sx={{ fontSize: 18 }} />
                      </Typography>
                    ) : null}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Restaurants;
