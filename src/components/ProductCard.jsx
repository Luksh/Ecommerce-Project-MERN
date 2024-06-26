import { Chip, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { fallbackImage } from "../constants/general.constants";

const ProductCard = (props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: "400px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
      <CardMedia
        sx={{ height: "300px", cursor: "pointer" }}
        image={props?.image || fallbackImage}
        title={props.name}
        onClick={() => {
          navigate(`/product-details/${props._id}`);
        }}
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>

          <Chip label={props.brand} color="secondary" variant="outlined" />
        </Stack>

        <Typography>Price:${props.price}</Typography>

        <Typography variant="body2" color="text.secondary">
          {props.description}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            navigate(`/product-details/${props._id}`);
          }}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
