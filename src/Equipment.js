import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { UserContext } from "./UserContext";
import { cartCtx } from "./App";
import { useHistory } from "react-router-dom";

const currencyFormatter = (number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    number
  );

export function Equipment({ equipment, setCart }) {
  const [cart, updateCart] = useContext(cartCtx);
  const user = localStorage.getItem("user");
  equipment = { ...equipment, username: user };
  const history = useHistory();
  return (
    <div className="equipment_container">
      <img
        className="pic_container"
        src={equipment.pic}
        alt={equipment.description}
      />
      <p className="description">{equipment.description}</p>
      <p className="rate">{currencyFormatter(equipment.rate)}</p>

      <Button
        variant="contained"
        onClick={() => {
          // console.log("clicked");
          if (!localStorage.getItem("token")) history.push("/login");
          else updateCart({ equipment, action: "increment" });
        }}
      >
        Add to cart
      </Button>
    </div>
  );
}
