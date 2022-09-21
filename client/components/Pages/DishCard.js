import React, { Fragment, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  CardMedia,
  Button,
  Alert,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DishCard = ({ dish }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quantity, setQuantity] = useState(1);

  const cart = useSelector((state) => state.cart);
  const isInTheCart = cart.lineItems.find(
    (lineItem) => lineItem.dishId === dish.id
  );

  const dispatch = useDispatch();

  const [alert, setAlert] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(dish, quantity)),
      handleClose(),
      setAlert(true),
      setTimeout(() => setAlert(false), 2000);
  };
  return (
    <Fragment>
      <div
        className="flex border border-slate-300 rounded-md w-1/3 h-1/4 m-2 p-2 hover:cursor-pointer"
        onClick={handleOpen}
      >
        <div>
          <p className="font-bold text-base">{dish.name}</p>
          <p className="text-sm">{dish.description}</p>
        </div>
        <img className="w-1/3 ml-1 self-right" src={dish.imageUrl}></img>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {dish.name}
          </Typography>
          <Typography variant="body2">{dish.description}</Typography>
          <CardMedia
            component="img"
            image={dish.imageUrl}
            sx={{ height: 90, mt: 2 }}
          />
          <div className="flex mt-3 justify-around items-center">
            <RemoveCircleOutlineIcon
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
            />
            <p>{quantity}</p>
            <ControlPointIcon onClick={() => setQuantity(quantity + 1)} />
            <Button variant="contained" onClick={() => handleAddToCart()}>
              Add to Cart - ${(dish.price * quantity).toFixed(2)}
            </Button>
          </div>
        </Box>
      </Modal>
      {alert ? <Alert severity="success">Added to Cart!</Alert> : null}
    </Fragment>
  );
};

export default DishCard;
