import React from "react";
import { useSelector } from "react-redux";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";

const Restaurants = (props) => {
  const restaurants = useSelector((state) => state.restaurants.slice(0, 100));
  return (
    <main>
      <div>
        <h1>Our Restaurants ({restaurants.length})</h1>
      </div>
      {/* Restaurant Listing Begins Here*/}
      <div className="flex flex-wrap justify-around">
        {restaurants.map((restaurant) => {
          return (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <Card sx={{ width: 245, height: 150, mb: 2 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={restaurant.imageUrl}
                    sx={{ height: 100 }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {restaurant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.description}
                    </Typography>
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
