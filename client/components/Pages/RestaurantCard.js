import React, {useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Card,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import {addSavedRestaurants, removeSavedRestaurants} from '../../store';
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant, liked }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    liked ? setIsFavorited(true) : setIsFavorited(false)
  }, [])
  const handleClick = () => {
    if(isFavorited){
      dispatch(removeSavedRestaurants(restaurant))
    } else {
      dispatch(addSavedRestaurants(restaurant));
    }
    setIsFavorited(!isFavorited)
  }
  return (
    <div>
      <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
        <Card sx={{ width: 300, height: 220, m: 1 }}>
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
                  Rating: {restaurant.score} <StarIcon sx={{ fontSize: 18 }} />
                </Typography>
              ) : null}
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
      <div className='restaurant-card-favorite' onClick={handleClick}>
        {isFavorited ?
            <AiFillHeart className="restaurant-card-favorite-icon"/> :
            <AiOutlineHeart className="restaurant-card-favorite-icon"/>
        }
      </div>
    </div>
  );
};

export default RestaurantCard;
