import React, { Fragment, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";

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
        </Box>
      </Modal>
    </Fragment>
  );
};

export default DishCard;
